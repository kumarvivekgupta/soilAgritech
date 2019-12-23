import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './containers/dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports     : [
    CommonModule,
    SharedModule,
  //  StoreModule.forFeature('dashboard', dashboardRootReducers),
   DashboardRoutingModule,
  ],
  providers   : []
})
export class DashboardModule {
}
