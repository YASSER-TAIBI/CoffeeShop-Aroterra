import {Component, inject, OnInit} from '@angular/core';
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
import {getMessaging, getToken, Messaging, onMessage, provideMessaging} from "@angular/fire/messaging";
import {appConfig, firebaseConfig} from "./app.config";

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
    AuthGuard
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'CoffeeShop-Aroterra';
  private messaging = inject(Messaging);


  ngOnInit() {
    this.requestPermission();
    this.listenForMessages();
  }

 async requestPermission() {
   try {

     console.log('messaging:', this.messaging);
    console.log('firebaseConfig.vpaiKey:', 'BNJtgfjgEg25WTDf7JZgd30QIaiIKpxaUuFffNCJHcH4QPfKPulHbPpGh7DmyVnuU_UcH-a0MyKTznpV5Qmk3dk' );
//
// Enregistre explicitement le service worker
     const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

   // Récupère le token
   const token = await getToken(this.messaging,{vapidKey: 'BNJtgfjgEg25WTDf7JZgd30QIaiIKpxaUuFffNCJHcH4QPfKPulHbPpGh7DmyVnuU_UcH-a0MyKTznpV5Qmk3dk', serviceWorkerRegistration: registration  })

        if(token) {
          console.log('Yeah we have the token');
          console.log('Token:', token);
        }else {
          console.log('We have a problem');
        }
   } catch(error) {
        console.error('Error getting token:', error);
      }
  }

  listenForMessages() {
    onMessage(this.messaging, (payload) => {
      console.log('Message reçu au premier plan:', payload);
      // Ici, vous pouvez afficher une notification dans l'interface utilisateur
    });
  }
}
