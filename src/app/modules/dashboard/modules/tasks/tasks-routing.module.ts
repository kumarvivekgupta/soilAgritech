import {RouterModule, Routes} from '@angular/router';
import {TaskListComponent} from './containers/task-list/task-list.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '', component: TaskListComponent , pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {

}
