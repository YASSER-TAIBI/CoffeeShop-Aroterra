import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartRoutingModule} from "./chart-routing.module";
import {ChartComponent} from "./chart.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartRoutingModule,
    ChartComponent
  ]
})
export class ChartModule { }
