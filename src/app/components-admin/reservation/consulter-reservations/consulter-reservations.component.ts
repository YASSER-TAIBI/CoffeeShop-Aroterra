import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {$locationShim} from "@angular/common/upgrade";
import {ReservationService} from "../../../services/reservation.service";
import {Reservation} from "../../../models/reservation";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {documentId} from "@angular/fire/firestore";
import Swal from "sweetalert2";
import {EventService} from "../../../services/event.service";
import {ColorEvent, Event, TypeEvent} from "../../../models/event";
import {dateSelectionJoinTransformer} from "@fullcalendar/core/internal";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-consulter-reservations',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './consulter-reservations.component.html',
  styleUrls: ['./consulter-reservations.component.css', '../../../../assets/css/admin-styles.css']
})
export class ConsulterReservationsComponent implements OnInit {

  reservationList: Reservation[] = [];
  etatOptions = ['En Cours', 'Valider', 'Non Valider'];

  authService = inject(AuthService);
  reservationService = inject(ReservationService);
  eventService = inject(EventService);

  //Pagination
  p: number = 1;

  searchText: string = '';

  ngOnInit(): void {

    this.getReservationList();
  }

  getReservationList() {
    this.reservationService.getReservation().subscribe(data => {
      if (data) {
        this.reservationList = data.map(reservation => ({
          id: reservation.id,
          ...reservation,
           formattedTime: reservation.time ? this.formatTime(reservation.time) : 'Heure invalide'
        }));


        // Trie les réservations par date et heure (du plus récent au plus ancien)
        this.reservationList.sort((a, b) => {
          // Convertit les objets date et time en timestamps pour la comparaison
          const timestampA = a.date ? this.getTimestamp(a.date, a.time) : 0;
          const timestampB = b.date ? this.getTimestamp(b.date, b.time) : 0;

          // Trie par ordre décroissant (du plus récent au plus ancien)
          return timestampB - timestampA;
        });

      } else {
        console.log("aucun Reservation trouvé");
      }
    });
  }

  get filteredReservations(): Reservation[] {
    return this.reservationList.filter(reservation =>
      reservation.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      reservation.prenom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  ViewReservation(reservation: Reservation) {
      Swal.fire({
        title: "Détails de la Réservation",
        html: `
<div class="form-container">
      <div class="form-row">
          <label class="form-label-row">Nom :</label>
          <label class="form-label-content">${reservation.nom}</label>
      </div>
      <div class="form-row">
          <label class="form-label-row">Prénom :</label>
          <label class="form-label-content">${reservation.prenom}</label>
      </div>
      <div class="form-row">
          <label class="form-label-row">Email :</label>
          <label class="form-label-content">${reservation.email}</label>
      </div>
      <div class="form-row">
          <label class="form-label-row">Téléphone :</label>
          <label class="form-label-content">${reservation.tel}</label>
      </div>
      <div class="form-row">
          <label class="form-label-row">Date :</label>
          <label class="form-label-content">${reservation.date}</label>
      </div>
      <div class="form-row">
          <label class="form-label-row">Heure :</label>
          <label class="form-label-content">${reservation.formattedTime}</label>
      </div>
      <div class="form-row">
          <label class="form-label-row">Nombre de personnes :</label>
          <label class="form-label-content">${reservation.people}</label>
      </div>
      <div class="form-row">
          <label class="form-label-row">Désignation :</label>
          <label class="form-label-content">${reservation.designation}</label>
      </div>
      <div class="form-row">
          <label class="form-label-row">Administrateur :</label>
          <label class="form-label-content">${reservation.adminEmail}</label>
      </div>
      <div class="form-row">
          <label class="form-label-row">État :</label>
          <label class="form-label-content">${reservation.etat}</label>
      </div>
    </div>
        `,
        showCancelButton: false,
        customClass: {
          title: "custom-title",
          popup: "custom-swal-popup",
        },
      })
  }
  async EditReservation(reservation: Reservation) {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: `Voulez-vous continuer la modification de cette réservation de ${reservation.nom} ${reservation.prenom} !`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#da9f5b",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Oui, modifiez-le !",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.updateReservation(reservation.id!,
          {etat: reservation.etat, adminEmail: this.authService.getCurrentUser()?.email || ''})
        if (reservation.etat == 'Valider' && reservation.date) {
          const event: Event = {
            action: `Réservation de ${reservation.nom} ${reservation.prenom} à ${reservation.formattedTime}`,
            dateDebut: reservation.date,
            dateFin: reservation.date,
            dateCreation: new Date(),
            typeEvent: TypeEvent.reservation,
            colorEvent: ColorEvent.orange
          };
          this.eventService.addEvent(event);
        }
        Swal.fire("Modifier!", "Réservation modifier avec succès!", "success");
      }
    });
  }

  async DeleteReservation(reservation: Reservation) {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: `Voulez-vous vraiment supprimer cette réservation de ${reservation.nom} ${reservation.prenom} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da9f5b",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Oui, supprimez-le !",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.deleteReservation(reservation.id!)
        Swal.fire("Supprimé!", "Réservation supprimée avec succès!", "success");
        this.reservationList = this.reservationList.filter(r => r.id !== reservation.id);
      }
    });
  }

  // Fonction pour convertir date et time en timestamp
  getTimestamp(date: NgbDateStruct, time: { hour?: number, minute?: number, second?: number }): number {
    if (!date || !time || time.hour == null || time.minute == null) {
      return 0; // Retourne 0 si la date ou l'heure est invalide
    }

    // Crée une date au format ISO (YYYY-MM-DDTHH:MM:SS)
    const isoDate = `${date}T${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}:00`;
    return new Date(isoDate).getTime(); // Retourne le timestamp
  }

  formatTime(time: { hour?: number, minute?: number, second?: number }): string {
    if (!time || time.hour == null || time.minute == null) {
      return 'Heure invalide';
    }
    return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
  }

  getEtatClass(etat: string): string {
    switch (etat) {
      case 'En Cours':
        return 'etat-en-cours';
      case 'Valider':
        return 'etat-valider';
      case 'Non Valider':
        return 'etat-non-valider';
      default:
        return '';
    }
  }

  protected readonly documentId = documentId;
}
