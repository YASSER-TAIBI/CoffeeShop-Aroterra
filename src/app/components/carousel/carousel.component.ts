import { Component } from '@angular/core';
import {AboutComponent} from "../about/about.component";
import {ContactComponent} from "../contact/contact.component";
import {TestimonialComponent} from "../testimonial/testimonial.component";
import {ReservationComponent} from "../reservation/reservation.component";
import {MenuComponent} from "../menu/menu.component";
import {OfferComponent} from "../offer/offer.component";
import {ServiceComponent} from "../service/service.component";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    AboutComponent,
    ContactComponent,
    TestimonialComponent,
    ReservationComponent,
    MenuComponent,
    OfferComponent,
    ServiceComponent
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

}
