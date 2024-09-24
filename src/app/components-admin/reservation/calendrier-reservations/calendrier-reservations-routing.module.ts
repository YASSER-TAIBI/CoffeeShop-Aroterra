import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CalendrierReservationsComponent} from "./calendrier-reservations.component";

const routes: Routes = [{ path: '', component: CalendrierReservationsComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class CalendrierReservationsRoutingModule { }
