import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './containers/dashboard/dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path     : '',
    component: DashboardComponent,
    children : [
      {
        path      : '',
        redirectTo: 'tasks',
        pathMatch : 'full'
      },
      {
        path        : 'tasks',
        loadChildren: './modules/tasks/' +
          'tasks.module#TasksModule',
      },
    ]
  }];

  @NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
  })

export class DashboardRoutingModule {
}
