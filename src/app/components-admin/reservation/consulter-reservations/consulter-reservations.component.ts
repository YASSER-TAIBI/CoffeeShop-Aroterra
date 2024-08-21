import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {$locationShim} from "@angular/common/upgrade";
import {ReservationService} from "../../../services/reservation.service";
import {Reservation} from "../../../models/reservation";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {documentId} from "@angular/fire/firestore";

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
          formattedDate: reservation.date ? this.formatDate(reservation.date) : '',
          formattedTime: reservation.time ? this.formatTime(reservation.time) : ''
        }));
        console.log("this.reservationList", this.reservationList);
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

  EditReservation(reservation: Reservation) {

    if (window.confirm('Voulez-vous continuer la modification de cette réservation !')) {
      this.reservationService.updateReservation(reservation.id!,
        {etat: reservation.etat, adminEmail: this.authService.getCurrentUser()?.email || ''})
        .then(() => {
          alert('Réservation modifier avec succès!');
          console.log('Reservation updated successfully!');
        })
        .catch(error => {
          console.error('Error updating reservation: ', error);
        });
    }
  }

  DeleteReservation(reservation: Reservation) {
    if (window.confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
      this.reservationService.deleteReservation(reservation.id!)
        .then(() => {
          alert('Réservation supprimée avec succès!');
          // Supprimez la réservation localement de la liste pour éviter un appel supplémentaire à Firestore
          this.reservationList = this.reservationList.filter(r => r.id !== reservation.id);
        })
        .catch(error => {
          console.error('Error deleting reservation: ', error);
        });
    }
  }

  formatDate(date: { year: number, month: number, day: number }): string {
    return `${date.day.toString().padStart(2, '0')}/${date.month.toString().padStart(2, '0')}/${date.year}`;
  }

  formatTime(time: { hour: number, minute: number, second?: number }): string {
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
