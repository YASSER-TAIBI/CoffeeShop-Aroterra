import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxSpinnerModule} from "ngx-spinner";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule],
  schemas : [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class DashboardModule { }
