import {Observable, Subject} from 'rxjs';

import {
    IState,
    IStateControl,
    INode,
    IProgramControl,
    IRecord,
    IAction,
    NODE_ID_ROOT,
    NODE_ID_DEFAULT,
    Reactor,
    NODE_CLASS_LIST,
    IStateMachine
} from '../state-machine-flow/state-machine-core';

import {v4} from 'uuid';
import {nSQL} from 'nano-sql';

export async function nSQLInitialization() {

    nSQL('Nodes').model([
        {key: 'id', type: 'uuid', props: ['pk']},
        {key: 'type', type: 'string'},
        {key: 'data', type: 'any'},
        {key: 'input', type: 'string'},
        {key: 'output', type: 'string'},
        {key: 'froms', type: 'Edges[]', props: ['ref=>from']}, // This row will hold an array of Post relationships. Many to one
        {key: 'tos', type: 'Edges[]', props: ['ref=>to']} // This row will hold an array of Post relationships. Many to one

    ]);

    nSQL('Edges').model([
        {key: 'id', type: 'string', props: ['pk']},
        {key: 'type', type: 'string'},
        {key: 'from', type: 'Nodes', props: ['ref=>froms[]', 'idx']},
        {key: 'to', type: 'Nodes', props: ['ref=>tos[]', 'idx']},
    ]).rowFilter(row => ({
        ...row,
        id: row.from + '-' + row.to
    }));

    nSQL('Records').model([
        {key: 'id', type: 'uuid', props: ['pk']},
        {key: 'ts', type: 'timeIdms'},
        {key: 'type', type: 'string'},
        {key: 'action', type: 'any'},
        {key: 'delta', type: 'any'},
    ]);

    nSQL('States').model([
        {key: 'id', type: 'uuid', props: ['pk']},
        {key: 'interface', type: 'any'},
        {key: 'processor', type: 'any'},
        {key: 'storage', type: 'any'},
    ]);

    await nSQL().connect();

    await nSQL('Nodes').query('upsert', {
        id: NODE_ID_ROOT,
        type: 'ROOT',
        data: null,
        input: null,
        output: null,
    }).exec();

    const id1 = v4();
    await nSQL('Nodes').query('upsert', {
        id: id1,
        type: 'DATA',
        data: 'Hi',
        input: null,
        output: 'text',
    }).exec();

    await nSQL('Edges').query('upsert', {
        type: 'FLOW',
        from: NODE_ID_ROOT,
        to: id1,
    }).exec();

    const id2 = v4();
    await nSQL('Nodes').query('upsert', {
        id: id2,
        type: 'DIALOG',
        data: null,
        input: 'text',
        output: 'response',
    }).exec();

    await nSQL('Edges').query('upsert', {
        type: 'FLOW',
        from: id1,
        to: id2,
    }).exec();

    await nSQL('Nodes').query('upsert', {
        id: NODE_ID_DEFAULT,
        type: 'ROOT',
        data: null,
        input: null,
        output: null,
    }).exec();

    const id3 = v4();
    await nSQL('Nodes').query('upsert', {
        id: id3,
        type: 'DATA',
        data: 'OK',
        input: null,
        output: 'text',
    }).exec();

    await nSQL('Edges').query('upsert', {
        type: 'FLOW',
        from: NODE_ID_DEFAULT,
        to: id3,
    }).exec();

    const id4 = v4();
    await nSQL('Nodes').query('upsert', {
        id: id4,
        type: 'DIALOG',
        data: null,
        input: 'text',
        output: 'response',
    }).exec();

    await nSQL('Edges').query('upsert', {
        type: 'FLOW',
        from: id3,
        to: id4,
    }).exec();

    const id5 = 'STATE'; // v4();
    await nSQL('States').query('upsert', {
        id: id5,
        interface: {
            component: null,
            data: null
        },
        processor: {
            cursor: NODE_ID_ROOT,
            register: {}
        },
        storage: {},
    }).exec();

}

export class TestProgramControl implements IProgramControl {

    nodes$: Subject<Array<any>>;
    edges$: Subject<Array<any>>;

    constructor() {

        this.nodes$ = new Subject();
        this.edges$ = new Subject();

        nSQL('Nodes').observable(() => {
            return nSQL('Nodes').query('select').emit();
        }).subscribe(nodes => {
            this.nodes$.next(nodes as Array<any>);
        });

        nSQL('Edges').observable(() => {
            return nSQL('Edges').query('select').emit();
        }).subscribe(edges => {
            this.edges$.next(edges as Array<any>);
        });

    }


    async getNode(id: string) {
        const q = await nSQL('Nodes').query('select').where(['id', '=', id]).exec();
        return q[0] as INode;
    }

    async getNextNodeId(node: INode) {

        const q = await nSQL('Edges').query('select').where(['from', '=', node.id]).exec();

        if (q.length === 0) {
            return NODE_ID_DEFAULT;
        }

        const _temp1 = Math.random() * q.length;
        const _temp2 = Math.floor(_temp1);

        return q[_temp2].to;

    }

    async getNextNodes(node: INode) {
        return Promise.all(node.tos.map(id => this.getNode(id)));
    }

    async addNode(type: string, data: any, input: string, output: string, id?: string) {

        const id_ = v4();

        await nSQL('Nodes').query('upsert', {
            id: id || id_,
            type: type,
            data: data || null,
            input: input || null,
            output: output || null,
        }).exec();

        return id || id_;
    }

    async addEdge(fromId: string, toId: string) {

        await nSQL('Edges').query('upsert', {
            type: 'FLOW',
            from: fromId,
            to: toId,
        }).exec();

        return fromId + '-' + toId;
    }

}

export class TestMemoryControl implements IStateControl {

    state$: Subject<IState>;
    records$: Subject<Array<IRecord>>;

    constructor() {

        this.state$ = new Subject();
        this.records$ = new Subject();

        nSQL('States').observable(() => {
            return nSQL('States').query('select').where(['id', '=', 'STATE']).emit();
        }).debounce(1000).map((q) => {
            return q[0] as IState;
        }).subscribe(state => {
            this.state$.next(state as IState);
        });

        nSQL('Records').observable(() => {
            return nSQL('Records').query('select').orderBy({'ts': 'desc'}).limit(20).emit();
        }).debounce(1000).map((q) => {
            return q as Array<IRecord>;
        }).subscribe(records => {
            this.records$.next(records as Array<IRecord>);
        });

    }

    async getState() {
        const q = await nSQL('States').query('select').where(['id', '=', 'STATE']).exec();
        return q[0] as IState;
    }

    async setState(state: IState) {
        await nSQL('States').query('upsert', {id: 'STATE', ...state}).exec();
    }

    async addRecords(records: Array<IRecord>) {
        nSQL('Records').query('upsert', records).exec().then();
    }

}


export class StateMachine implements IStateMachine {

    private reactor: Reactor;
    private stateControl: TestMemoryControl;
    public programControl: TestProgramControl;

    state$: Observable<IState>;
    records$: Observable<Array<IRecord>>;
    nodes$: Observable<Array<any>>;
    edges$: Observable<Array<any>>;

    constructor() {

        this.stateControl = new TestMemoryControl();
        this.programControl = new TestProgramControl();

        this.reactor = new Reactor(this.programControl, this.stateControl, NODE_CLASS_LIST);

        this.state$ = this.stateControl.state$;
        this.records$ = this.stateControl.records$;

        this.nodes$ = this.programControl.nodes$;
        this.edges$ = this.programControl.edges$;
    }

    async act(action: IAction) {
        await this.reactor.react(action);
    }

}

