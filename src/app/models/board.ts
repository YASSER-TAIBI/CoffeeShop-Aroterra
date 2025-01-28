import { List } from './list';

export interface Board {
  id: string;
  title: string;
  lists: List[];
}
