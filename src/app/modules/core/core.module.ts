import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {MatSnackBarModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {reducer} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FetchTasksService} from './services/task-add.service';

@NgModule({
  declarations: [
  ],
  imports     : [
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
   // MatSnackBarModule,
    StoreModule.forRoot(reducer, {metaReducers: []}),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 50}) : []
  ],
  exports     : [
  ],
  providers   : [
    FetchTasksService
  ]
})
export class CoreModule {
}


