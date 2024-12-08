import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {Event, TypeEvent} from "../../../models/event";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-event',
  standalone: true,
    imports: [
        FormsModule,

        ReactiveFormsModule
    ],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css',  '../../../../assets/css/admin-styles.css']
})
export class AddEventComponent {

  typeEvent = TypeEvent;

  eventService = inject(EventService);

  formData = {
    action: '',
    dateDebut: null as NgbDateStruct | null,
    dateFin: null as NgbDateStruct | null,
    typeEvent: ''
  };

  get typeEvents(): string[] {
    return Object.values(this.typeEvent);
  }

  private getTypeEventEnum(value: string): TypeEvent| undefined {
    return Object.values(TypeEvent).find(item => item === value);
  }

  async onSubmit(){
    console.log('Form Submitted', this.formData);

    if (this.formData.action === ''|| !this.formData.dateDebut || !this.formData.dateFin || this.formData.typeEvent === '' ) {
      alert('Remplir tous les champs de saisie !');
      return;
    }

    if (window.confirm('Voulez-vous continuer la réservation de votre table !')) {

      const typeEventEnum = this.getTypeEventEnum(this.formData.typeEvent);

      const event: Event = {
        action: this.formData.action || '',
        typeEvent: typeEventEnum,
        dateDebut: this.formData.dateDebut,
        dateFin: this.formData.dateFin,
      };

      console.log('Form Submitted', event);
      await  this.eventService.addEvent(event).then(() => {
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
