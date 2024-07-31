import {Component, inject, Input, ViewEncapsulation} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { NgbDatepickerModule, NgbDateStruct, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {Reservation} from "../../models/reservation";
import {ReservationService} from "../../services/reservation.service";

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
  styleUrls: ['./reservation.component.css', '../../../assets/css/style.css', "../../../assets/css/style.min.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ReservationComponent{

  @Input() showPageHeader: boolean = true;
  reservationService = inject(ReservationService);

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
    telForm:"Téléphone",
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
    tel: '',
    date: null as NgbDateStruct | null,
    time: { hour: 7, minute: 0 },
    people: ''
  };

  async onSubmit(): Promise<void> {
    console.log('Form Submitted', this.formData);

    if (this.formData.name === '' || this.formData.email === '' || this.formData.tel === '' || !this.formData.date || this.formData.people === '') {
      alert('Remplir tous les champs de saisie !');
      return;
    }

    if (window.confirm('Voulez-vous continuer la réservation de votre table !')) {
      const reservation: Reservation = {
        name: this.formData.name || '',
        email: this.formData.email || '',
        tel: this.formData.tel || '',
        date: this.formData.date,
        time: this.formData.time,
        people: this.formData.people || '',
        adminEmail:'',
        etat: "En cours" || '',
      };

      console.log('Form Submitted', reservation);
      await  this.reservationService.addReservation(reservation).then(() => {
        this.resetForm();
        alert('Profil mis à jour avec succès!');
      }).catch(error => {
        console.error(error);
        alert('Erreur lors de la mise à jour du profil.');
      });
    }
  }

  resetForm(){
  this.formData = {
    name: '',
    email: '',
    tel: '',
    date: null,
    time: { hour: 7, minute: 0 },
    people: ''
  }
  }
}
