export enum TestimonialCivilite {
  monsieur = 'M.',
  madame = 'Mme'
}

export interface Testimonial {
  id?: string;
  nom: string;
  prenom: string;
  civilite: string;
  photo: string;
  dateCreation: Date;
  service: number;
  proprete: number;
  nourriture: number;
  appreciation: number; // 5-star rating
  email: string;
  commentaire: string;
}
