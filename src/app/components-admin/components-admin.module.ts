import {CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentsAdminRoutingModule } from './components-admin-routing.module';
import { ComponentsAdminComponent  } from './components-admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileModule } from './profile/profile.module';
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { ConsulterReservationsModule } from './reservation/consulter-reservations/consulter-reservations.module';
import { ReserverTableModule } from './reservation/reserver-table/reserver-table.module';
import { ConsulterReservationsRoutingModule } from './reservation/consulter-reservations/consulter-reservations-routing.module';
import { ReserverTableRoutingModule } from './reservation/reserver-table/reserver-table-routing.module';
import { AddArticlesModule } from './menu/add-articles/add-articles.module';
import { AddArticlesRoutingModule } from './menu/add-articles/add-articles-routing.module';
import { CalendrierReservationsModule } from './reservation/calendrier-reservations/calendrier-reservations.module';
import { CalendrierReservationsRoutingModule } from './reservation/calendrier-reservations/calendrier-reservations-routing.module';
import {FullCalendarModule} from "@fullcalendar/angular";
import { TestimonialClientModule } from './testimonial-client/testimonial-client.module';
import { TestimonialClientRoutingModule } from './testimonial-client/testimonial-client-routing.module';
import { NotificationModule } from './notification/notification.module';
import { NotificationRoutingModule } from './notification/notification-routing.module';
import { BreakfastModule } from './menu/breakfast/breakfast.module';
import { ColdDrinksModule } from './menu/cold-drinks/cold-drinks.module';
import { HotDrinksModule } from './menu/hot-drinks/hot-drinks.module';
import { HotDrinksRoutingModule } from './menu/hot-drinks/hot-drinks-routing.module';
import { ColdDrinksRoutingModule } from './menu/cold-drinks/cold-drinks-routing.module';
import { BreakfastRoutingModule } from './menu/breakfast/breakfast-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule,
    CommonModule,
    ComponentsAdminRoutingModule,
    ComponentsAdminComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    ProfileModule,
    ProfileRoutingModule,
    ConsulterReservationsModule,
    ReserverTableModule,
    ConsulterReservationsRoutingModule,
    ReserverTableRoutingModule,
    AddArticlesModule,
    AddArticlesRoutingModule,
    CalendrierReservationsModule,
    CalendrierReservationsRoutingModule,
    FullCalendarModule,
    TestimonialClientModule,
    TestimonialClientRoutingModule,
    NotificationModule,
    NotificationRoutingModule,
    BreakfastModule,
    ColdDrinksModule,
    HotDrinksModule,
    HotDrinksRoutingModule,
    ColdDrinksRoutingModule,
    BreakfastRoutingModule,

    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsAdminModule {}
