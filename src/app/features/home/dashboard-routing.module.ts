import { DashboardDemoComponent } from './components/dashboard/dashboarddemo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
