import {Component, OnInit} from '@angular/core';
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import {ReservationService} from "../../../services/reservation.service";
import {Reservation} from "../../../models/reservation";

@Component({
  selector: 'app-calendrier-reservations',
  standalone: true,
  imports: [
    FullCalendarModule
  ],
  templateUrl: './calendrier-reservations.component.html',
  styleUrls: ['./calendrier-reservations.component.css', '../../../../assets/css/admin-styles.css']
})
export class CalendrierReservationsComponent implements OnInit {

  calendarOptions: CalendarOptions = {

    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth, timeGridWeek, timeGridDay'
    },
    locale: frLocale,
  };
    constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    // Récupérer les réservations validées depuis Firestore
    this.reservationService.getValidatedReservations().subscribe((reservations: Reservation[]) => {
      // Mapper les réservations au format d'événements FullCalendar
      const events = reservations.map(reservation => ({
        title: `${reservation.nom} ${reservation.prenom}`,
        start: reservation.date && reservation.time ? this.formatDateTime(reservation.date, reservation.time) : '',
        end: reservation.date && reservation.time ? this.formatEndDateTime(reservation.date, reservation.time) : '',
        description: `Reservation de ${reservation.nom} ${reservation.prenom}, ${reservation.people} personne(s).`
      }));

      // Mettre à jour les options du calendrier avec les nouveaux événements
      this.calendarOptions.events = events;
    });
  }

  // Méthode pour formater la date et l'heure en 'YYYY-MM-DDTHH:mm:ss'
  formatDateTime(date: { year: number, month: number, day: number }, time: { hour: number; minute: number }): string {
    const formattedDate = this.formatDate(date);
    const formattedTime = this.formatTime(time);
    return `${formattedDate}T${formattedTime}`;
  }

// Méthode pour formater la date en 'YYYY-MM-DD'
  formatDate(date: { year: number, month: number, day: number }): string {
    const year = date.year.toString();
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

// Méthode pour formater l'heure en 'HH:mm:ss'
  formatTime(time: { hour: number; minute: number }): string {
    const hour = time.hour.toString().padStart(2, '0');
    const minute = time.minute.toString().padStart(2, '0');
    return `${hour}:${minute}:00`; // FullCalendar attend le format 'HH:mm:ss'
  }

// Si vous avez une heure de fin, vous pouvez aussi avoir une méthode pour calculer l'heure de fin
  formatEndDateTime(date: { year: number, month: number, day: number }, time: { hour: number; minute: number }): string {
    // Pour cet exemple, ajoutons 1 heure à l'heure de début
    let endHour = time.hour + 1;
    let endMinute = time.minute;

    // Si l'heure dépasse 24h, ajustez l'heure et la date (vous pouvez implémenter cette logique selon vos besoins)
    if (endHour >= 24) {
      endHour = 0;
    }

    const formattedEndTime = this.formatTime({ hour: endHour, minute: endMinute });
    const formattedDate = this.formatDate(date);
    return `${formattedDate}T${formattedEndTime}`;
  }
}
