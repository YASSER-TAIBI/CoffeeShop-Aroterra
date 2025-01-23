import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketRoutingModule} from "./ticket-routing.module";
import {TicketComponent} from "./ticket.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TicketRoutingModule,
    TicketComponent
  ]
})
export class TicketModule { }
