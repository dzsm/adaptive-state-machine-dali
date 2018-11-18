export interface IInterface {
    component: string;
    data: any;
}

export interface IProcessor {
    cursor: string;
    register: {};
}

export interface IState {
    interface: IInterface;
    processor: IProcessor;
    storage: {};
}

export const ACTION_TYPE_USER = 'USER';
export const ACTION_TYPE_DALI = 'DALI';

export interface IAction {
    ts?: number;
    type: string;
    data: any;
}


export interface INode {
    id?: string;
    type: string;
    data: any;
    tos: Array<string>;

    input?: string;
    output?: string;
}

export interface IProgramControl {
    getNode: (string) => Promise<INode>;
    getNextNodeId: (INode) => Promise<string>;
    getNextNodes: (INode) => Promise<Array<INode>>;
}

export const RECORD_TYPE_PROCESS = 'PROCESS';
export const RECORD_TYPE_INTERRUPTION = 'INTERRUPTION';

export interface IRecord {
    ts: number;
    type: string;
    delta: any;
    action?: IAction;
}

export interface IStateControl {
    getState: () => Promise<IState>;
    setState: (a: IState) => void;
    addRecords: (a: Array<IRecord>) => void;
}
