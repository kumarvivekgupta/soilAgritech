import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path      : '',
    redirectTo: '/dashboard/tasks',
    pathMatch : 'full'
  },
  {
    path        : 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
