import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Auth, signInWithEmailAndPassword, signOut, user} from "@angular/fire/auth";
import {BehaviorSubject, from, Observable} from "rxjs";
import {badgeUser, UserConnect} from "../models/userConnect";
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

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => {
        this.setCurrentUser(email);
      });
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    });
    return from(promise);
  }

  getCurrentUser(): UserConnect | null | undefined {
    return this.currentUserSubject.value;
  }

  setCurrentUser(email: string | null | undefined) {
    if (!email) {
      this.currentUserSubject.next(null);
      localStorage.removeItem('currentUser');
      return;
    }

    const userMap: Record<string, UserConnect> = {
      'yasser.taibi.19@gmail.com': {
        email: 'yasser.taibi.19@gmail.com',
        username: 'Yasser TAIBI',
        userRole: 'Administrateur',
        civilite: 'Mr',
        userImage: 'https://www.bhaskaranbrown.com/wp-content/uploads/2023/07/1-2.png',
        badges: [badgeUser.createur, badgeUser.management, badgeUser.validateur, badgeUser.reservateur, badgeUser.superviseur, badgeUser.developpeur]
      },
      'jalila.aalilou555@gmail.com': {
        email: 'jalila.aalilou555@gmail.com',
        username: 'Jalila AALILOU',
        userRole: 'Administrateur',
        civilite: 'Mme',
        userImage: 'https://www.bhaskaranbrown.com/wp-content/uploads/2023/07/2-2.png',
        badges: [badgeUser.createur, badgeUser.management, badgeUser.validateur, badgeUser.reservateur, badgeUser.superviseur, badgeUser.demandeur, badgeUser.testeur]
      },
      'aroterra.lyon@gmail.com': {
        email: 'aroterra.lyon@gmail.com',
        username: 'Aroterra LYON',
        userRole: 'Utilisateur',
        civilite: 'Mr',
        userImage: 'https://www.bhaskaranbrown.com/wp-content/uploads/2023/07/1-2.png',
        badges: [badgeUser.consultant, badgeUser.validateur, badgeUser.reservateur, badgeUser.demandeur, badgeUser.testeur]
      },
    };
    const user = userMap[email.toLowerCase()];
    if (!user) {
      this.currentUserSubject.next(null);
      localStorage.removeItem('currentUser');
      return;
    }
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  async setProfilUser(email: string | null | undefined) {
    if (!email) {
      this.profilUserSubject.next(null);
      return;
    }
    try {
      const userProfile = await this.userProfileService.getUserProfileEmail(email);

      if (userProfile) {
        this.profilUserSubject.next(userProfile);
      } else {
        this.profilUserSubject.next(null);
      }
    } catch (error) {
      this.profilUserSubject.next(null);
    }
  }

  getProfilUser(): UserProfile | null | undefined {
    return this.profilUserSubject.value;
  }

  isHasRoles(roles: string[]): boolean {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      return false;
    }
    const currentUser = JSON.parse(storedUser);
    if (!currentUser.userRole) {
      localStorage.removeItem('currentUser');
      return false;
    }
    return roles.some(role => currentUser.userRole.toLowerCase() === role.toLowerCase());
  }

}
