import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForecastComponent } from './forecast/forecast.component';
import { MATERIAL_MODULES } from './material';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ...MATERIAL_MODULES

  ],
  declarations: [
    AppComponent,
    ForecastComponent
  ],
  providers: [
    provideHttpClient(),
    provideNativeDateAdapter()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/