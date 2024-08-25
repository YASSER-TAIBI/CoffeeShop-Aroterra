import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddArticlesComponent} from "./add-articles.component";
import {AddArticlesRoutingModule} from "./add-articles-routing.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddArticlesComponent,
    AddArticlesRoutingModule
  ]
})
export class AddArticlesModule { }
