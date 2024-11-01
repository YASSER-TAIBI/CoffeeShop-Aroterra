import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColdDrinksComponent} from "./cold-drinks.component";
import {ColdDrinksRoutingModule} from "./cold-drinks-routing.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ColdDrinksComponent,
    ColdDrinksRoutingModule
  ]
})
export class ColdDrinksModule { }
