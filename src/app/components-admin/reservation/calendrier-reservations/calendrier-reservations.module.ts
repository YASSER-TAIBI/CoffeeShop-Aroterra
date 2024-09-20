import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendrierReservationsRoutingModule} from "./calendrier-reservations-routing.module";
import {CalendrierReservationsComponent} from "./calendrier-reservations.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendrierReservationsRoutingModule,
    CalendrierReservationsComponent
  ]
})
export class CalendrierReservationsModule { }
