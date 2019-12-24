import {RouterModule, Routes} from '@angular/router';
import {TaskListComponent} from './containers/task-list/task-list.component';
import {NgModule} from '@angular/core';
import {AddTaskComponent} from '../../../shared/add-task/add-task.component';
import {DeleteComponent} from '../../../shared/delete-popup/delete-popup.component';

const routes: Routes = [
  {
    path: '', component: TaskListComponent, pathMatch: 'full',
  },
  {path: 'add', component: AddTaskComponent},
  {
    path: ':id/edit', component: AddTaskComponent
  },
  {
    path: ':id/delete', component: DeleteComponent
  }

  ,

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {

}
