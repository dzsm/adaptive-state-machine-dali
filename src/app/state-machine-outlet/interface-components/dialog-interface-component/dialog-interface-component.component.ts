import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ACTION_TYPE_USER, StateMachineService} from '../../../state-machine';

@Component({
    templateUrl: './dialog-interface-component.component.html',
    styleUrls: ['./dialog-interface-component.component.css']
})
export class DialogInterfaceComponentComponent implements OnInit {

    static nodeInterfaceRef = 'dialog';

    @Input() data: any;

    constructor(public stateMachineService: StateMachineService) {
    }

    ngOnInit() {

    }

    send(data: any) {
        this.stateMachineService.act({type: ACTION_TYPE_USER, data: data, ts: Date.now()});
    }
}


