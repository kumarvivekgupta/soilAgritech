import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AddTaskComponent} from './add-task/add-task.component';
import {DeleteComponent} from './delete-popup/delete-popup.component';


const DeclaredAndExported = [
  AddTaskComponent, DeleteComponent
];
const DeclaredOnly        = [];


@NgModule({
  imports: [
    CommonModule,
    // FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],

  declarations   : [
    ...DeclaredAndExported, ...DeclaredOnly,
  ],
  entryComponents: [],
  exports        : [
    // FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ...DeclaredAndExported,
  ],
  providers      : [],
})
export class SharedModule {
}
