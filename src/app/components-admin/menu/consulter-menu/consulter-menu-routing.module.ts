import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ConsulterMenuComponent} from "./consulter-menu.component";

const routes: Routes = [{ path: '', component: ConsulterMenuComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class ConsulterMenuRoutingModule { }
