import {Component} from '@angular/core';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent {

  offer= {
    title:"50% DE RÉDUCTION",
    description: "Offre spéciale du dimanche",
    detail:"Uniquement le dimanche du 1er janvier au 30 janvier 2045",
    inputName:"Votre Email",
    btn:"S'inscrire"
  }
}
