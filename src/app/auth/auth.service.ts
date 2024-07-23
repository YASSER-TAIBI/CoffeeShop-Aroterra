import {inject, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import {Auth, signInWithEmailAndPassword, signOut, user} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {UserConnect} from "../models/userConnect";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<UserConnect | null | undefined>(undefined)

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

  setCurrentUser(email: string | null | undefined) {
    if (!email) {
      this.currentUserSig.set(null);
      return;
    }

    switch (email.toLowerCase()) {
      case 'yasser.taibi.19@gmail.com':
        this.currentUserSig.set({
          email,
          username: 'Yasser TAIBI',
          userRole: 'Administrateur',
          civilite: 'Mr',
        });
        break;
      case 'jalila.aalilou555@gmail.com':
        this.currentUserSig.set({
          email,
          username: 'Jalila AALILOU',
          userRole: 'Administrateur',
          civilite: 'Mme',
        });
        break;
      default:
        this.currentUserSig.set(null);
    }
  }
  isLoggedIn() {
  }
}
