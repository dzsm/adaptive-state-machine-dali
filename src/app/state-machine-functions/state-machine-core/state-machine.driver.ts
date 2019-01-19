import {
    IState,
    IStateControl,
    IProgramControl,
    IAction,
    RECORD_TYPE_PROCESS,
    IRecord,
    RECORD_TYPE_INTERRUPTION,
} from './state-machine.models';

import jiff from 'jiff';
import jsonpack from 'jsonpack';
import {Observable} from 'rxjs';

export class Reactor {

    private executorMap = {};

    constructor(private programControl: IProgramControl, private stateControl: IStateControl, private executors: Array<any>) {
        executors.forEach(executor => this.executorMap[executor.nodeType] = executor);
    }

    getExecutor(nodeType: string) {
        return this.executorMap[nodeType];
    }

    async react(action: IAction) {

        const state = await this.stateControl.getState();

        const programControl = this.programControl;

        const node = await programControl.getNode(state.processor.cursor);
        const executor = this.getExecutor(node.type);

        const records = [];

        let newState = await executor.process(programControl, jiff.clone(state), node, action);
        const deltaState = jiff.diff(newState, state);
        records.push({ts: Date.now(), type: RECORD_TYPE_PROCESS, delta: deltaState, action: action} as IRecord);

        while (newState.processor.cursor) {
            const oldState = newState;

            const newNode = await programControl.getNode(newState.processor.cursor);
            const newExecutor = this.getExecutor(newNode.type);

            if (newExecutor.interrupt) {

                newState = await newExecutor.interrupt(programControl, jiff.clone(oldState), newNode);
                const deltaInterruptState = jiff.diff(newState, oldState);
                records.push({ts: Date.now(), type: RECORD_TYPE_INTERRUPTION, delta: deltaInterruptState} as IRecord);

                this.stateControl.setState(newState);
                this.stateControl.addRecords(records);
                return newState;
            }

            newState = await newExecutor.process(programControl, jiff.clone(oldState), newNode);
            const deltaProcessState = jiff.diff(newState, oldState);
            records.push({ts: Date.now(), type: RECORD_TYPE_PROCESS, delta: deltaProcessState} as IRecord);

        }

        this.stateControl.setState(newState);
        this.stateControl.addRecords(records);
        return newState;
    }

}

export interface IStateMachine {
    state$: Observable<IState>;
    act: (IAction) => void;
}

