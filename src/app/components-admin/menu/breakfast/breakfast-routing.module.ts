import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreakfastComponent} from "./breakfast.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{ path: '', component: BreakfastComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class BreakfastRoutingModule { }
