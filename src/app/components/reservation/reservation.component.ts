import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  @Input() showPageHeader: boolean = true;

}
