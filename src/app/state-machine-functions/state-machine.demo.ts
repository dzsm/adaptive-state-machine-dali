import {BehaviorSubject, Observable} from 'rxjs';
import {v4} from 'uuid';

import {
    IState,
    IStateControl,
    INode,
    IProgramControl,
    IRecord,
    IAction,
    Reactor,
    NODE_ID_ROOT,
    NODE_CLASS_LIST
} from './state-machine-core';

export const defaultInitialGraph = {
    [NODE_ID_ROOT]: {
        id: NODE_ID_ROOT,
        type: 'ROOT',
        data: null,
        tos: ['DA1'],
    } as INode,
    DA1: {
        id: 'DA1',
        type: 'DATA',
        data: 'This is an example string.',
        output: 'text',
        tos: ['DI1'],
    } as INode,
    DI1: {
        id: 'DI1',
        type: 'DIALOG',
        input: 'text',
        output: 'response',
        data: null,
        tos: ['DA2'],
    } as INode,
    DA2: {
        id: 'DA2',
        type: 'DATA',
        data: 'This is another example string.',
        output: 'text',
        tos: ['DI2'],
    } as INode,
    DI2: {
        id: 'DI2',
        type: 'DIALOG',
        input: 'text',
        output: 'response',
        data: null,
        tos: [],
    } as INode,
};
export const defaultInitialState = {

    interface: {
        component: null,
        data: null
    },
    processor: {
        cursor: NODE_ID_ROOT,
        register: {}
    },
    storage: {}

} as IState;
export const defaultInitialRecords = [];

export class TestProgramControl implements IProgramControl {

    program: any;

    constructor(initialProgram: any) {
        this.program = initialProgram;
    }

    async getNode(id: string) {
        return this.program[id] || this.program[NODE_ID_ROOT];
    }

    async getNextNodeId(node: INode) {

        const _temp1 = Math.random() * node.tos.length;
        const _temp2 = Math.floor(_temp1);

        return node.tos[_temp2] ? node.tos[_temp2] : NODE_ID_ROOT;
    }

    async getNextNodes(node: INode) {
        return Promise.all(node.tos.map(async id => this.getNode(id)));
    }

    addNode(fromNodeId: string, node: INode) {
        node.id = v4();
        this.program[fromNodeId].tos.push(node.id);
        this.program.push(node);
    }

    addLink(fromNodeId: string, toNodeId: string) {
        this.program[fromNodeId].tos.push(toNodeId);
    }

    removeLink(fromNodeId: string, toNodeId: string) {
        this.program[fromNodeId].tos.remove(toNodeId);
    }

}

export class TestMemoryControl implements IStateControl {

    state$: BehaviorSubject<IState>;
    records$: BehaviorSubject<Array<IRecord>>;

    state: IState;
    records: Array<IRecord>;

    constructor(initialState: IState, initialRecords: Array<IRecord>) {

        this.state = initialState;
        this.records = initialRecords;

        this.state$ = new BehaviorSubject(initialState);
        this.records$ = new BehaviorSubject(initialRecords);

    }

    async getState() {
        return this.state;
    }

    async setState(state: IState) {
        this.state = state;
        this.state$.next(this.state);
    }

    async addRecords(records: Array<IRecord>) {
        this.records.push(...records);
        this.records$.next(this.records);
    }

}


export class StateMachine {

    private reactor: Reactor;
    private stateControl: TestMemoryControl;
    private programControl: TestProgramControl;

    state$: Observable<IState>;
    records$: Observable<Array<IRecord>>;

    constructor() {

        this.stateControl = new TestMemoryControl(defaultInitialState, defaultInitialRecords);
        this.programControl = new TestProgramControl(defaultInitialGraph);

        this.reactor = new Reactor(this.programControl, this.stateControl, NODE_CLASS_LIST);

        this.state$ = this.stateControl.state$;
        this.records$ = this.stateControl.records$;

    }

    async act(action: IAction) {
        await this.reactor.react(action);
    }

}

