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
  typeArticle: MenuTypeArticle | undefined;
  imageUrl: string | undefined;
  price: number | undefined;
  article: string | undefined;
  description: string | undefined;
  etat: MenuEtat | undefined;
}
