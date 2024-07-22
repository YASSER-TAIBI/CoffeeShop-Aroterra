import {inject, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import {Auth, signInWithEmailAndPassword, signOut, user} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {UserInterface} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<UserInterface | null | undefined>(undefined)

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

  isLoggedIn() {
  }
}
