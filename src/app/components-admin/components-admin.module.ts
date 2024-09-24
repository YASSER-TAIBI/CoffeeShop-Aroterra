import {NgModule, OnInit} from '@angular/core';
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
import { ConsulterMenuModule } from './menu/consulter-menu/consulter-menu.module';
import { ConsulterMenuRoutingModule } from './menu/consulter-menu/consulter-menu-routing.module';
import { DeleteArticleModalComponent} from './menu/delete-article-modal/delete-article-modal.component'
import { EditArticleModalComponent} from './menu/edit-article-modal/edit-article-modal.component'
import { CalendrierReservationsModule } from './reservation/calendrier-reservations/calendrier-reservations.module';
import { CalendrierReservationsRoutingModule } from './reservation/calendrier-reservations/calendrier-reservations-routing.module';
import {FullCalendarModule} from "@fullcalendar/angular";

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
    ConsulterMenuModule,
    ConsulterMenuRoutingModule,
    DeleteArticleModalComponent,
    EditArticleModalComponent,
    CalendrierReservationsModule,
    CalendrierReservationsRoutingModule,
    FullCalendarModule
  ],
})
export class ComponentsAdminModule {}
