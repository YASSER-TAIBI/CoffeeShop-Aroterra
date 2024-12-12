import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {ColorEvent, Event, TypeEvent} from "../../../models/event";
import {NgbDatepickerModule, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-event',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
    ],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css',  '../../../../assets/css/admin-styles.css']
})
export class AddEventComponent {

  eventService = inject(EventService);

  formData = {
    action: '',
    dateDebut: null as NgbDateStruct | null,
    dateFin: null as NgbDateStruct | null,
    typeEvent: TypeEvent.rappel,
    colorEvent: ColorEvent.turquoise,
  };

  get typeEvents(): string[] {
    return Object.values(TypeEvent).filter(eventType =>
      eventType !== TypeEvent.vacances_ma && eventType !== TypeEvent.vacances_fr
    );
  }

  private getTypeEventEnum(value: string): TypeEvent| undefined {
    return Object.values(TypeEvent).find(item => item === value);
  }

  async onSubmit(){
    if (this.formData.action === ''|| !this.formData.dateDebut || !this.formData.dateFin || !this.formData.typeEvent) {
      alert('Remplir tous les champs de saisie !');
      return;
    }

    if (window.confirm("Voulez-vous continuer la création de l'événement ?")) {

      const typeEventEnum = this.getTypeEventEnum(this.formData.typeEvent);
      const colorEvent = this.getColorForEvent(typeEventEnum);

      const event: Event = {
        action: this.formData.action || '',
        typeEvent: typeEventEnum,
        dateDebut: this.formData.dateDebut,
        dateCreation: new Date(),
        dateFin: this.formData.dateFin,
        colorEvent: colorEvent,
      };

      console.log('Form Submitted', event);
      await  this.eventService.addEvent(event).then(() => {
        this.resetForm();
        alert('Événement mis à jour avec succès!');
      }).catch(error => {
        console.error(error);
        alert('Erreur lors de la mise à jour de événement.');
      });
    }
  }

  private getColorForEvent(typeEvent: TypeEvent | undefined): ColorEvent | undefined {
    const colorMapping: Record<TypeEvent, ColorEvent> = {
      [TypeEvent.vacances_ma]: ColorEvent.vert,
      [TypeEvent.vacances_fr]: ColorEvent.bleu,
      [TypeEvent.rappel]: ColorEvent.turquoise,
      [TypeEvent.reunion]: ColorEvent.jaune,
      [TypeEvent.anniversaire]: ColorEvent.rouge,
      [TypeEvent.fete]: ColorEvent.marron,
      [TypeEvent.visite]: ColorEvent.gris,
      [TypeEvent.dejeunerD]: ColorEvent.violet,
    };

    return typeEvent ? colorMapping[typeEvent] : undefined;
  }

  resetForm(){
    this.formData = {
      action: '',
      dateDebut: null,
      dateFin: null,
      typeEvent: TypeEvent.rappel,
      colorEvent: ColorEvent.turquoise,
    }
  }
}
