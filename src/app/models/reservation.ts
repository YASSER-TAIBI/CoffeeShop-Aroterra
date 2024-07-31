import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface Reservation {
  name: string;
  email: string;
  tel: string;
  date: NgbDateStruct | null;
  time: { hour: number; minute: number };
  people: string;
  adminEmail: string;
  etat: string;
}
