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
import {NotfoundComponent} from "./components/notfound/notfound.component";

export const routes: Routes = [

  {title: "ARÔTERRA | Accueil", path: '' , component: CarouselComponent},
  {title: "ARÔTERRA | Accueil",path: 'home' , component: CarouselComponent},
  {title: "ARÔTERRA | À propos de nous",path: 'about' , component: AboutComponent},
  {title: "ARÔTERRA | Service",path: 'service' , component: ServiceComponent},
  {title: "ARÔTERRA | Menu",path: 'menu' , component: MenuComponent},
  {title: "ARÔTERRA | Réservation",path: 'reservation' , component: ReservationComponent},
  {title: "ARÔTERRA | Contact",path: 'contact' , component: ContactComponent},
  {title: "ARÔTERRA | Témoignages",path: 'contact' , component: TestimonialComponent},
  {title: "ARÔTERRA | Erreur 404",path: '**' , component: NotfoundComponent},
];
