import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxdModule} from '@ngxd/core';

import {StateMachineOutletComponent} from './state-machine-outlet/state-machine-outlet.component';
import {INTERFACE_COMPONENT_LIST} from './interface-components';
import {StateMachineModule} from '../state-machine';

@NgModule({
    imports: [
        CommonModule, NgxdModule, StateMachineModule
    ],
    declarations: [
        StateMachineOutletComponent,
        ...INTERFACE_COMPONENT_LIST
    ],
    entryComponents: INTERFACE_COMPONENT_LIST,
    exports: [
        StateMachineOutletComponent,
    ]
})
export class StateMachineOutletModule {
}
