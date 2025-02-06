export type CardType = 'Evol' | 'Bug';
export type Priorite  = 'Bloquant' | 'Urgent' | 'Court-terme' | 'Long-terme';

export interface Board {
  id?: string; // Document ID de Firestore
  title: string;
  lists: List[];
}

export interface List {
  id: string;
  IdBoard: string;
  title: string;
  cards: Card[];
}

export interface Card {
  id: string;
  IdList: string;
  title: string;
  description: string;
  priorite: Priorite;
  type: CardType;
}
