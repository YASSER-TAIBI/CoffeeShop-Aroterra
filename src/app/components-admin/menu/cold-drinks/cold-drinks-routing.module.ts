import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColdDrinksComponent} from "./cold-drinks.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{ path: '', component: ColdDrinksComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class ColdDrinksRoutingModule { }
