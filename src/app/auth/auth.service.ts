import {inject, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import {Auth, signInWithEmailAndPassword, signOut, user} from "@angular/fire/auth";
import {BehaviorSubject, from, Observable} from "rxjs";
import {UserConnect} from "../models/userConnect";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth)
  private currentUserSubject = new BehaviorSubject<UserConnect | null>(null);
  currentUserSig = this.currentUserSubject.asObservable();

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
          civilite: 'M.',
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
      default:
        this.currentUserSubject.next(null);
    }
  }
  isLoggedIn() {
  }
}
