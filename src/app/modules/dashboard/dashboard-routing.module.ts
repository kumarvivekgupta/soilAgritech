import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const dashboardRoutes: Routes = [
  {
    path     : '',
   // component: DashboardComponent,
    children : []
  }];

  @NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
  })

export class DashboardRoutingModule {
}
