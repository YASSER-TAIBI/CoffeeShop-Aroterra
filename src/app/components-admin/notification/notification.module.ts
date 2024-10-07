import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationRoutingModule} from "./notification-routing.module";
import {NotificationComponent} from "./notification.component";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NotificationComponent,
    NgxPaginationModule
  ]
})
export class NotificationModule { }
