import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import 'hammerjs';


if (environment.production) {
    enableProdMode();
}

import {nSQLInitialization} from './app/state-machine/state-machine.nsql';

nSQLInitialization().then(() => {

    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.log(err));

});


