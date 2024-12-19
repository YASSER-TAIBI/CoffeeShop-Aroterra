export enum badgeUser {
  createur = 'Créateur',
  management = 'Management',
  consultant = 'Consultant',
  validateur = 'Validateur',
  superviseur = 'Superviseur',
  developpeur = 'Développeur',
  reservateur = 'Réservateur',
  demandeur = 'Demandeur',
  testeur = 'Testeur'
}

export interface UserConnect {
  email: string;
  username: string;
  userRole: string;
  civilite: string;
  userImage: string;
  badges: string | badgeUser[];
}
