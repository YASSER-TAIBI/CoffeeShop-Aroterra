import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ComponentsAdminRoutingModule } from './components-admin-routing.module';
import { DashboardComponent  } from './dashboard/dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    ComponentsAdminRoutingModule,
    DashboardComponent
  ]
})
export class ComponentsAdminModule { }
