import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HotDrinksRoutingModule} from "./hot-drinks-routing.module";
import {HotDrinksComponent} from "./hot-drinks.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HotDrinksComponent,
    HotDrinksRoutingModule
  ]
})
export class HotDrinksModule { }
