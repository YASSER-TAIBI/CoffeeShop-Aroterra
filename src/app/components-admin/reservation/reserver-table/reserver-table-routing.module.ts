import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ReserverTableComponent} from "./reserver-table.component";


const routes: Routes = [{ path: '', component: ReserverTableComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class ReserverTableRoutingModule { }
