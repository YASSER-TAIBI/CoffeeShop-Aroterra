import { Card } from './card';

export interface List {
  id: string;
  title: string;
  boardId: string;
  position: number;
  cards: Card[];
}
