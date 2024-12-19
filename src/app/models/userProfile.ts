
import {badgeUser} from "./userConnect";

export interface UserProfile {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  civilite: string;
  userImage: string
  adresse: string;
  pays_adresse: string;
  region_adresse: string;
  ville_adresse: string;
  postal_adresse: number;
  userRole: string;
  badges: string | badgeUser[];
}
