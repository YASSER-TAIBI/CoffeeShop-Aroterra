import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ConsulterReservationsComponent} from "./consulter-reservations.component";

const routes: Routes = [{ path: '', component: ConsulterReservationsComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class ConsulterReservationsRoutingModule { }
