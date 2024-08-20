import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface Reservation {

  id?: string;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  date: NgbDateStruct | null;
  time: { hour: number; minute: number };
  people: string;
  adminEmail: string;
  etat: string;
  designation: string;

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//format Date and Time to string
  formattedDate?: string;
  formattedTime?: string;
}
