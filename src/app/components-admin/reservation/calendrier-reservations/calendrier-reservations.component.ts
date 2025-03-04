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
        start: reservation.time ? `${reservation.date}T${this.formatTime(reservation.time)}` : '',
        end: reservation.time ? `${reservation.date}T${this.formatEndTime(reservation.time)}` : '',
        description: `Reservation de ${reservation.nom} ${reservation.prenom}, ${reservation.people} personne(s).`
      }));

      // Mettre à jour les options du calendrier avec les nouveaux événements
      this.calendarOptions.events = events;
    });
  }

  // Formater l'heure en 'HH:mm:ss'
  formatTime(time: { hour: number; minute: number }): string {
    const hour = String(time.hour).padStart(2, '0');
    const minute = String(time.minute).padStart(2, '0');
    return `${hour}:${minute}:00`; // Format attendu par FullCalendar
  }

  // Calcul de l'heure de fin (ajout d'une heure)
  formatEndTime(time: { hour: number; minute: number }): string {
    let endHour = time.hour + 1;
    let endMinute = time.minute;

    if (endHour >= 24) {
      endHour = 0; // Réinitialisation si on dépasse minuit
    }

    return `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}:00`;
  }
}
