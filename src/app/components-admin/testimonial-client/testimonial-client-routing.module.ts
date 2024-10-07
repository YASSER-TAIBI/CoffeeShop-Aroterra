import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TestimonialClientComponent} from "./testimonial-client.component";

const routes: Routes = [{path: '', component: TestimonialClientComponent}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class TestimonialClientRoutingModule {
}
