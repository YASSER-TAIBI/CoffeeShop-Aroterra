import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";
import {
  NgbDatepickerModule,
  NgbDateStruct,
  NgbTimepickerModule
} from "@ng-bootstrap/ng-bootstrap";
import {Reservation} from "../../../models/reservation";
import {ReservationService} from "../../../services/reservation.service";

@Component({
  selector: 'app-reserver-table',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
  ],
  templateUrl: './reserver-table.component.html',
  styleUrls: ['./reserver-table.component.css',  '../../../../assets/css/admin-styles.css']
})
export class ReserverTableComponent {
  reservationService = inject(ReservationService);

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

  isEditable: boolean = false;

  authService = inject(AuthService);

  async onSubmit(){
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
