import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export enum TypeEvent {
  evenemnt = 'Event',
  rappel = 'Rappel'
}

export interface Event {
  id?: string;
  action: string;
  dateDebut: NgbDateStruct | null;
  dateFin: NgbDateStruct | null;
  dateCreation?: Date;
  typeEvent: TypeEvent | undefined;
}
