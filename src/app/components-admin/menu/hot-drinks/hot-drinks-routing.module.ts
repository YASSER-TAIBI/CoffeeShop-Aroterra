import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HotDrinksComponent} from "./hot-drinks.component";

const routes: Routes = [{ path: '', component: HotDrinksComponent }];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class HotDrinksRoutingModule { }
