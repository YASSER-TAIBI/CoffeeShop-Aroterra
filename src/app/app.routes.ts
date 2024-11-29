import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { MenuComponent } from './components/menu/menu.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {LoginComponent} from "./components/login/login.component";
import {authGuard} from './auth/auth.guard';
import {ComponentsAdminComponent} from "./components-admin/components-admin.component";
import {FULL_ROUTES} from "./routes/full-layout.routes";
import {AvisTestimonialComponent} from "./components/avis-testimonial/avis-testimonial.component";

export const routes: Routes = [

  {title: "ARÔTERRA | Accueil", path: '' , component: CarouselComponent},
  {title: "ARÔTERRA | Accueil",path: 'accueil' , component: CarouselComponent},
  {title: "ARÔTERRA | À propos",path: 'about' , component: AboutComponent},
  {title: "ARÔTERRA | Service",path: 'service' , component: ServiceComponent},
  {title: "ARÔTERRA | Menu",path: 'menu' , component: MenuComponent},
  {title: "ARÔTERRA | Réservation",path: 'reservation' , component: ReservationComponent},
  {title: "ARÔTERRA | Contact",path: 'contact' , component: ContactComponent},
  {title: "ARÔTERRA | Témoignages",path: 'testimonial' , component: TestimonialComponent},
  {title: "ARÔTERRA | Témoignages",path: 'avis-testimonial' , component: AvisTestimonialComponent},
  {title: "ARÔTERRA | Login",path: 'login' , component: LoginComponent},
  { path: '', component: ComponentsAdminComponent,
    children : FULL_ROUTES, canActivate:[authGuard]
  },
  {title: "ARÔTERRA | Erreur 404",path: '**' , component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
