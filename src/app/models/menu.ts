export enum MenuTypeArticle {
  BoissonsChaudes = 'Boissons Chaudes',
  BoissonsFroides = 'Boissons Froides',
  PetitDejeuner = 'Petit-déjeuner'
}

export enum MenuEtat {
  Dispo = 'Disponible',
  NonDispo = 'Non Disponible'
}

export interface Menu {

  id?: string;
  typeArticle: MenuTypeArticle;
  imageUrl: string;
  price: number;
  article: string;
  description: string;
  etat: MenuEtat
}
