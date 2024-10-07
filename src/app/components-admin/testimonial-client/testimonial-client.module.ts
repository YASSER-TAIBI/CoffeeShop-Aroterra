import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestimonialClientRoutingModule} from "./testimonial-client-routing.module";
import {TestimonialClientComponent} from "./testimonial-client.component";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TestimonialClientRoutingModule,
    TestimonialClientComponent,
    NgxPaginationModule
  ]
})
export class TestimonialClientModule { }
