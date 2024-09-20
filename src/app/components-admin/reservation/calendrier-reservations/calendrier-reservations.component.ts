import { Component } from '@angular/core';
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendrier-reservations',
  standalone: true,
  imports: [
    FullCalendarModule
  ],
  templateUrl: './calendrier-reservations.component.html',
  styleUrls: ['./calendrier-reservations.component.css', '../../../../assets/css/admin-styles.css']
})
export class CalendrierReservationsComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick({arg: arg}),
    events: [
      { title: 'event 1', date: '2024-09-01' },
      { title: 'event 2', date: '2024-09-02' }
    ]
  };

  handleDateClick({arg}: { arg: any }) {
    alert('date click! ' + arg.dateStr)
  }
}
