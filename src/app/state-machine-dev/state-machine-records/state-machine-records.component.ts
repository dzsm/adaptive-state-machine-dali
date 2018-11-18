import {Component, NgZone, OnInit} from '@angular/core';
import {StateMachineService} from '../../state-machine';

@Component({
    selector: 'app-state-machine-records',
    templateUrl: './state-machine-records.component.html',
    styleUrls: ['./state-machine-records.component.css']
})
export class StateMachineRecordsComponent implements OnInit {

    records: Array<any>;

    constructor(public stateMachineService: StateMachineService, private _ngZone: NgZone) {
    }

    ngOnInit() {

        this.stateMachineService.records$.subscribe(records => {
            this._ngZone.run(() => {
                this.records = records;
            });
        });

    }

}
