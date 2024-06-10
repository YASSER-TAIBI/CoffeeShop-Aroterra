import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { OfferComponent } from './components/offer/offer.component';
import { MenuComponent } from './components/menu/menu.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';

export const routes: Routes = [

  {path: ' ' , component: CarouselComponent},
  {path: 'home' , component: CarouselComponent},
  {path: 'about' , component: AboutComponent},
  {path: 'service' , component: ServiceComponent},
  {path: 'menu' , component: MenuComponent},
  {path: 'reservationC' , component: ReservationComponent},
  {path: 'contact' , component: ContactComponent},
  {path: 'testimonial' , component: TestimonialComponent},

];
