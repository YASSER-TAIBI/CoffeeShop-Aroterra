import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export enum TypeEvent {
  vacances_ma ='Vacances MA',
  vacances_fr ='Vacances FR',
  rappel = 'Rappel',
  reunion = 'Réunion',
  anniversaire = 'Anniversaire',
  fete = 'Fête',
  visite = 'Visite',
  dejeunerD = 'Déjeuner d\'affaires',
}

export enum ColorEvent {
  vert = '#008000',       // Vert
  bleu = '#0000FF',       // Bleu
  turquoise = '#36B9CC',  // Turquoise
  jaune = '#FFFF00',      // Jaune
  rouge = '#FF0000',      // Rouge
  marron = '#8B4513',     // Marron
  gris = '#808080',       // Gris
  violet = '#800080',     // Violet
  orange = '#DA9F5B'      // Orange
}

export interface Event {
  id?: string;
  action: string;
  dateDebut: NgbDateStruct | null;
  dateFin: NgbDateStruct | null;
  dateCreation?: Date;
  typeEvent: TypeEvent | undefined;
  colorEvent: ColorEvent | undefined;
}
