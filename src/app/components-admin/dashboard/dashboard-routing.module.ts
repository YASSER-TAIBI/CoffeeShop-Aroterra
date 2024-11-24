import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import  { BrowserAnimationsModule } from "@angular/platform-browser/animations" ;
// Importer un module de bibliothèque
import  { NgxSpinnerModule } from "ngx-spinner" ;

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
