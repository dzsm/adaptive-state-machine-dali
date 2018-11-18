import {Component, NgZone, OnInit} from '@angular/core';
import {StateMachineService} from '../../state-machine';

@Component({
    selector: 'app-state-machine-state',
    templateUrl: './state-machine-state.component.html',
    styleUrls: ['./state-machine-state.component.css']
})
export class StateMachineStateComponent implements OnInit {

    state: any;

    constructor(public stateMachineService: StateMachineService, private _ngZone: NgZone) {
    }

    ngOnInit() {

        this.stateMachineService.state$.subscribe(state => {
            this._ngZone.run(() => {
                this.state = state;
            });
        });

    }

    getRegisterArray() {
        if (this.state) {
            return Object.keys(this.state.processor.register).map(key => {
                return {key: key, value: this.state.processor.register[key]};
            });
        }
        return [];
    }

    getStorageArray() {
        if (this.state) {
            return Object.keys(this.state.storage).map(key => {
                return {key: key, value: this.state.storage[key]};
            });
        }
        return [];
    }


}
