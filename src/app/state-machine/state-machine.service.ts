import {Injectable} from '@angular/core';

import {StateMachine} from './state-machine.nsql';
import {IStateMachine} from '../state-machine-functions/state-machine-core';

@Injectable({
    providedIn: 'root'
})
export class StateMachineService extends StateMachine implements IStateMachine {

    constructor() {
        super();
    }

}
