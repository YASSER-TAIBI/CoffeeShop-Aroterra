import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";
import {NgbDateStruct, NgbInputDatepicker, NgbTimepicker} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-reserver-table',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbInputDatepicker,
    NgbTimepicker
  ],
  templateUrl: './reserver-table.component.html',
  styleUrls: ['./reserver-table.component.css',  '../../../../assets/css/admin-styles.css']
})
export class ReserverTableComponent {

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

  onSubmit(){}

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
