import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsulterMenuComponent} from "./consulter-menu.component";
import {ConsulterMenuRoutingModule} from "./consulter-menu-routing.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConsulterMenuComponent,
    ConsulterMenuRoutingModule
  ]
})
export class ConsulterMenuModule { }
