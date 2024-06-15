import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgbDatepickerModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
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
model: NgbDateStruct | undefined;

  formData = {
    name: '',
    email: '',
    date:  '',
    time: '',
    people: ''
  };

  onSubmit(): void {
    console.log('Form Submitted', this.formData);
    // Vous pouvez ajouter ici le code pour envoyer les données au serveur
  }
}
