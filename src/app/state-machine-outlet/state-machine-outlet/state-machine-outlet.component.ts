import {Component, NgZone, OnInit} from '@angular/core';
import {INTERFACE_COMPONENT_MAP} from '../interface-components';
import {StateMachineService, NODE_ID_ROOT} from '../../state-machine';

@Component({
    selector: 'app-state-machine-outlet',
    templateUrl: './state-machine-outlet.component.html',
    styleUrls: ['./state-machine-outlet.component.css']
})
export class StateMachineOutletComponent implements OnInit {

    interface: any;

    constructor(public stateMachineService: StateMachineService, private _ngZone: NgZone) {
    }

    ngOnInit() {

        this.stateMachineService.state$.subscribe(state => {

            this._ngZone.run(() => {
                this.interface = {
                    component: INTERFACE_COMPONENT_MAP[state.interface.component],
                    data: state.interface.data,
                };
            });

            if (state.processor.cursor === NODE_ID_ROOT) {
                this.stateMachineService.act(null).then();
            }

        });


    }

}
