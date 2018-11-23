import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';

import {StateMachineModule} from '../state-machine';
import {StateMachineStateComponent} from './state-machine-state/state-machine-state.component';
import {StateMachineRecordsComponent} from './state-machine-records/state-machine-records.component';
import {
    AddConnectionDialogComponent,
    AddNodeDialogComponent,
    StateMachineGraphComponent
} from './state-machine-graph/state-machine-graph.component';
import {NodeComponent} from './state-machine-graph/node/node.component';
import {NgxDiagramModule} from 'ngx-diagram';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDiagramModule,

        SharedModule,

        StateMachineModule
    ],
    declarations: [StateMachineStateComponent, StateMachineRecordsComponent, StateMachineGraphComponent, NodeComponent,
        AddConnectionDialogComponent, AddNodeDialogComponent],
    entryComponents: [AddConnectionDialogComponent, AddNodeDialogComponent],
    exports: [StateMachineStateComponent, StateMachineRecordsComponent, StateMachineGraphComponent],
})
export class StateMachineDevModule {
}
