import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {$locationShim} from "@angular/common/upgrade";
import {ReservationService} from "../../../services/reservation.service";
import {Reservation} from "../../../models/reservation";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

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

  ngOnInit(): void {
    this.getReservationList();
  }

  getReservationList() {
    this.reservationService.getReservation().subscribe(data => {
      if (data) {
        this.reservationList = data.map(reservation => ({
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

}
