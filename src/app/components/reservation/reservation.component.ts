import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  @Input() showPageHeader: boolean = true;

  formData = {
    name: '',
    email: '',
    date: '',
    time: '',
    people: ''
  };

  onSubmit(): void {
    console.log('Form Submitted', this.formData);
    // Vous pouvez ajouter ici le code pour envoyer les données au serveur
  }
}
