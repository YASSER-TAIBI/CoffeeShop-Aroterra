import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileRoutingModule} from "../../profile/profile-routing.module";
import {ProfileComponent} from "../../profile/profile.component";
import {ConsulterReservationsRoutingModule} from "./consulter-reservations-routing.module";
import {ConsulterReservationsComponent} from "./consulter-reservations.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConsulterReservationsRoutingModule,
    ConsulterReservationsComponent
  ]
})
export class ConsulterReservationsModule { }
