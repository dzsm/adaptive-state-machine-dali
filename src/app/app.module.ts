import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {StateMachineOutletModule} from './state-machine-outlet';
import {StateMachineDevModule} from './state-machine-dev';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule,
        StateMachineOutletModule, StateMachineDevModule
    ],
    entryComponents: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

