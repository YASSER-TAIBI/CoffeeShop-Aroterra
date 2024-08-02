import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileRoutingModule} from "../../profile/profile-routing.module";
import {ProfileComponent} from "../../profile/profile.component";
import {ConsulterReservationsRoutingModule} from "./consulter-reservations-routing.module";
import {ConsulterReservationsComponent} from "./consulter-reservations.component";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConsulterReservationsRoutingModule,
    ConsulterReservationsComponent,
    NgxPaginationModule
  ]
})
export class ConsulterReservationsModule { }
