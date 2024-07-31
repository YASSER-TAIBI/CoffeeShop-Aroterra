import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReserverTableRoutingModule} from "./reserver-table-routing.module";
import {ReserverTableComponent} from "./reserver-table.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReserverTableRoutingModule,
    ReserverTableComponent
  ]
})
export class ReserverTableModule { }
