import {Component, inject, Input, ViewEncapsulation} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { NgbDatepickerModule, NgbDateStruct, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {Reservation} from "../../models/reservation";
import {Notification} from "../../models/notification";
import {ReservationService} from "../../services/reservation.service";
import {NotificationService} from "../../services/notification.service";

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
  notificationService = inject(NotificationService);

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
    prenomForm:"Prénom",
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
    ],
    designationForm: "Désignation"

  }
  formData = {
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    date: null as NgbDateStruct | null,
    time: { hour: 7, minute: 0 },
    people: '',
    designation: '',
  };

  async onSubmit(): Promise<void> {
    console.log('Form Submitted', this.formData);

    if (this.formData.nom === '' ||this.formData.prenom === '' || this.formData.email === '' || this.formData.tel === '' || !this.formData.date || this.formData.people === '' || this.formData.designation === '' ) {
      alert('Remplir tous les champs de saisie !');
      return;
    }

    if (window.confirm('Voulez-vous continuer la réservation de votre table !')) {
      const reservation: Reservation = {
        nom: this.formData.nom || '',
        prenom: this.formData.prenom || '',
        email: this.formData.email || '',
        tel: this.formData.tel || '',
        date: this.formData.date,
        time: this.formData.time,
        people: this.formData.people || '',
        designation: this.formData.designation || '',
        adminEmail:'',
        etat: "En Cours" || '',
      };

      console.log('Form Submitted', reservation);
      await  this.reservationService.addReservation(reservation).then(async (resId) => {
        this.resetForm();
        alert('Réservation effectuée avec succès!');

        // Extraire l'ID du document de la réservation
        const reservationId = resId.id;

        // Ajouter une notification en cas de succès
        const notification: Notification = {
          dateCreation: new Date(),
          description: `Nouvelle réservation par ${reservation.nom} ${reservation.prenom} pour ${reservation.people} personnes.`,
          icon: 'fa-calendar-alt',
          color: '#da9f5b !important',
          isRead: false,
          titre: 'Reservation',
          reservationId: reservationId
        };
        await this.notificationService.addNotification(notification);
      }).catch(error => {
        console.error(error);
        alert('Erreur lors de la mise à jour du profil.');
      });
    }
  }

  resetForm(){
  this.formData = {
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    date: null,
    time: { hour: 7, minute: 0 },
    people: '',
    designation: ''
  }
  }
}
