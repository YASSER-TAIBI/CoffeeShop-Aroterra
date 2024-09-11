import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

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
import { NotfoundComponent} from "./components/notfound/notfound.component";
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import {DialogComponent} from "./shared/components/dialog/dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    NgbModule,
    NavbarComponent,
    CarouselComponent,
    AboutComponent,
    ServiceComponent,
    OfferComponent,
    MenuComponent,
    ReservationComponent,
    ContactComponent,
    FooterComponent,
    TestimonialComponent,
    NotfoundComponent,
    DialogComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CoffeeShop-Aroterra';
}
