import {Component, Input, ViewEncapsulation } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { NgbDatepickerModule, NgbDateStruct, NgbTimepickerModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ReservationComponent {

  @Input() showPageHeader: boolean = true;

  reservation = {
    title:"Réservation en ligne",
    urlPrevious:"Accueil",
    urlCurrent:"Réservation",
    reductionTitre: "30% DE RÉDUCTION",
    reductionDetail: "Pour les réservations en ligne",
    reductionTexte: "Profitez de notre offre exclusive pour les réservations en ligne. Réservez dès maintenant et bénéficiez de 30% de réduction sur votre table.",
    reductionPoint: [
      {id:1, icon:"fa-check", point:"Réduction exclusive"},
      {id:2, icon:"fa-check", point:"Réservation facile et rapide"},
      {id:3, icon:"fa-check", point:"Confort garanti"},
    ],
    titreForm: "Réservez votre table",
    nomForm:"Nom",
    emailForm:"Email",
    dateForm:"Date",
    heureForm:"Heure",
    personneForm:"Personne",
    personneOption: [
      {id: 1, texte: "1 Personne"},
      {id: 2, texte: "2 Personnes"},
      {id: 3, texte: "3 Personnes"},
      {id: 4, texte: "4 Personnes"}
    ]

  }

  formData = {
    name: '',
    email: '',
    date: null as NgbDateStruct | null,
    time: { hour: 13, minute: 30 },
    people: ''
  };

  onSubmit(): void {
    console.log('Form Submitted', this.formData);
  }
}
