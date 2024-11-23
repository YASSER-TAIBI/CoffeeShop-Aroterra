import {inject, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import {Auth, signInWithEmailAndPassword, signOut, user} from "@angular/fire/auth";
import {BehaviorSubject, from, Observable} from "rxjs";
import {UserConnect} from "../models/userConnect";
import {UserProfile} from "../models/userProfile";
import {UserProfileService} from "../services/user-profile.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth)
  private currentUserSubject = new BehaviorSubject<UserConnect | null>(null);
  currentUserSig = this.currentUserSubject.asObservable();

  private profilUserSubject = new BehaviorSubject<UserProfile | null>(null);
  profilUserSig = this.profilUserSubject.asObservable();

  private userProfileService = inject(UserProfileService);

  constructor(private router: Router) { }

  login(email: string ,password: string): Observable<void> {

    const promise =  signInWithEmailAndPassword( this.firebaseAuth,
      email,
      password
    ).then(()=> {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  getCurrentUser(): UserConnect | null | undefined {
    return this.currentUserSubject.value;
  }

  setCurrentUser(email: string | null | undefined) {
    if (!email) {
      this.currentUserSubject.next(null);
      return;
    }

    switch (email.toLowerCase()) {
      case 'yasser.taibi.19@gmail.com':
        this.currentUserSubject.next({
          email,
          username: 'Yasser TAIBI',
          userRole: 'Administrateur',
          civilite: 'Mr',
          userImage: 'https://www.bhaskaranbrown.com/wp-content/uploads/2023/07/1-2.png'
        });
        break;
      case 'jalila.aalilou555@gmail.com':
        this.currentUserSubject.next({
          email,
          username: 'Jalila AALILOU',
          userRole: 'Administrateur',
          civilite: 'Mme',
          userImage: 'https://www.bhaskaranbrown.com/wp-content/uploads/2023/07/2-2.png'
        });
        break;
      case 'aroterra.lyon@gmail.com':
        this.currentUserSubject.next({
          email,
          username: 'Aroterra LYON',
          userRole: 'Utilisateur',
          civilite: 'Mr',
          userImage: 'https://www.bhaskaranbrown.com/wp-content/uploads/2023/07/1-2.png'
        });
        break;
      default:
        this.currentUserSubject.next(null);
    }
  }

  async setProfilUser(email: string | null | undefined) {
    if (!email) {
      this.profilUserSubject.next(null);
      return;
    }
    try {
      // Appeler le service pour récupérer le profil utilisateur
      const userProfile = await this.userProfileService.getUserProfileEmail(email);

      if (userProfile) {
        // Mettre à jour le BehaviorSubject avec les données récupérées
        this.profilUserSubject.next(userProfile);
      } else {
        // Si aucun profil n'est trouvé, émettre `null`
        this.profilUserSubject.next(null);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil utilisateur :', error);
      this.profilUserSubject.next(null);
    }
  }

  getProfilUser(): UserProfile | null | undefined {
    return this.profilUserSubject.value;
  }

  isLoggedIn() {
  }
}
