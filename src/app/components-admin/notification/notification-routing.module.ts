import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ConsulterReservationsComponent} from "../reservation/consulter-reservations/consulter-reservations.component";
import {NotificationComponent} from "./notification.component";

const routes: Routes = [{path: '', component: NotificationComponent}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class NotificationRoutingModule {
}
