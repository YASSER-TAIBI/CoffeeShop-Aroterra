import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { OfferComponent } from './components/offer/offer.component';
import { MenuComponent } from './components/menu/menu.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components-admin/dashboard/dashboard.component";
import { AuthGuard } from './auth/auth.guard';
//import {FULL_ROUTES} from "./components/routes/full-layout.routes";

export const routes: Routes = [

  {title: "ARÔTERRA | Accueil", path: '' , component: CarouselComponent},
  {title: "ARÔTERRA | Accueil",path: 'accueil' , component: CarouselComponent},
  {title: "ARÔTERRA | À propos",path: 'about' , component: AboutComponent},
  {title: "ARÔTERRA | Service",path: 'service' , component: ServiceComponent},
  {title: "ARÔTERRA | Menu",path: 'menu' , component: MenuComponent},
  {title: "ARÔTERRA | Réservation",path: 'reservation' , component: ReservationComponent},
  {title: "ARÔTERRA | Contact",path: 'contact' , component: ContactComponent},
  {title: "ARÔTERRA | Témoignages",path: 'contact' , component: TestimonialComponent},

  {title: "ARÔTERRA | Login",path: 'login' , component: LoginComponent},
  {path: 'dashboard', loadChildren: () => import('./components-admin/components-admin.module').then(m => m.ComponentsAdminModule), canActivate: [AuthGuard] },
  //{path: '', component: HomeComponent, children : FULL_ROUTES },
  {title: "ARÔTERRA | Erreur 404",path: '**' , component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
