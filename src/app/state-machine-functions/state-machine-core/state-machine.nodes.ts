import {
    CATEGORY_LIST,
    DEFAULT_NODE_BEGIN_KIND,
    DEFAULT_NODE_DATA_KIND,
    DEFAULT_NODE_DECISION_KIND,
    DEFAULT_NODE_DECISION_PORT_FALSE,
    DEFAULT_NODE_DECISION_PORT_TRUE,
    DEFAULT_NODE_END_KIND,
    DEFAULT_NODE_PORT_IN,
    DEFAULT_NODE_PORT_OUT,
    DEFAULT_NODE_PROCEDURE_KIND,
    DEFAULT_NODE_ROUTER_FEEDBACK_KIND,
    DEFAULT_NODE_ROUTER_KIND,
    DEFAULT_NODE_ROUTER_PORT_ELSE,
    DEFAULT_NODE_TASK_KIND
} from './state-machine.constants';


import {
    IState,
    INode,
    IProgramControl,
    IAction
} from './state-machine.models';

export abstract class DialogNodeClass {

    static readonly nodeType = 'DIALOG'; // This provides a reference to this class
    static readonly nodeKind = DEFAULT_NODE_TASK_KIND; // This describes connectivity topology
    static readonly nodeInterfaceRef = 'dialog';
    static readonly nodeForm = [{field: 'input'}, {field: 'output'}];

    static async interrupt(graph: IProgramControl, memory: IState, node: INode) { // input output
        const input = node.input;
        const data = memory.processor.register[input];
        memory.interface.component = this.nodeInterfaceRef;
        memory.interface.data = data;
        return memory;
    }

    static async process(graph: IProgramControl, memory: IState, node: INode, action: IAction) {
        const data = action.data;
        const output = node.output;
        memory.processor.register[output] = data;
        memory.processor.cursor = await graph.getNextNodeId(node);
        return memory;
    }

}

export abstract class RootNodeClass {

    static readonly nodeType = 'ROOT';
    static readonly nodeKind = DEFAULT_NODE_BEGIN_KIND;
    static readonly nodeForm = [];

    static async process(graph: IProgramControl, memory: IState, node: INode, action?: IAction) {
        memory.processor.cursor = await graph.getNextNodeId(node);
        return memory;
    }


}

export abstract class DataNodeClass {

    static readonly nodeType = 'DATA';
    static readonly nodeKind = DEFAULT_NODE_DATA_KIND;
    static readonly nodeForm = [{field: 'data', options: ['string', 'number']}, {field: 'output'}];

    static async process(graph: IProgramControl, memory: IState, node: INode, action?: IAction) {

        const data = node.data;
        const output = node.output;

        memory.processor.register[output] = data;
        memory.processor.cursor = await graph.getNextNodeId(node);
        return memory;
    }

}

export abstract class RandomRouterNodeClass {

    static readonly nodeType = 'RANDOM';
    static readonly nodeKind = DEFAULT_NODE_ROUTER_KIND;
    static readonly nodeForm = [];

    static async process(graph: IProgramControl, memory: IState, node: INode, action?: IAction) {
        memory.processor.cursor = await graph.getNextNodeId(node);
        return memory;
    }

}

import {findBestMatch} from 'string-similarity';

export abstract class NearestRouterNodeClass {

    static readonly nodeType = 'NEAREST';
    static readonly nodeKind = DEFAULT_NODE_ROUTER_KIND;
    static readonly nodeForm = [{field: 'input'}];

    static async process(graph: IProgramControl, memory: IState, node: INode, action?: IAction) {

        const input = node.input;

        const source = memory.processor.register[input];
        const nextNodes = await graph.getNextNodes(node);
        const options = nextNodes.map(n => n.data);
        const result = findBestMatch(source, options);

        const index = options.indexOf(result.bestMatch.target);
        const nextCursor = nextNodes[index].id;

        memory.processor.cursor = nextCursor;
        return memory;
    }

}


export const NODE_CLASS_LIST = [
    RootNodeClass,
    DataNodeClass,
    RandomRouterNodeClass,
    NearestRouterNodeClass,
    DialogNodeClass,
];

export const TYPE_TO_NODE_CLASS_MAP = {};
NODE_CLASS_LIST.forEach(nodeClass => TYPE_TO_NODE_CLASS_MAP[nodeClass.nodeType] = nodeClass);

export const CATEGORY_TO_TYPE_MAP = {};
export const CATEGORY_TO_TYPE_LIST = [];

NODE_CLASS_LIST.forEach(nodeClass => {
    const categories = CATEGORY_LIST.filter(category => category.kind === nodeClass.nodeKind);
    categories.forEach(category => {
        const categoryType = {...category, type: nodeClass.nodeType};
        CATEGORY_TO_TYPE_MAP[nodeClass.nodeType] = categoryType; // this loses info if there more visual categories
        CATEGORY_TO_TYPE_LIST.push(categoryType);
    });
});

