import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskListComponent} from './containers/task-list/task-list.component';
import {SharedModule} from '../../../shared/shared.module';
import {TasksRoutingModule} from './tasks-routing.module';

@NgModule({
  imports     : [
    TasksRoutingModule,
    SharedModule,
    CommonModule
  ],
  declarations: [TaskListComponent]
})
export class TasksModule {

}
