import {inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {User} from "../models/user"
import {error} from "@angular/compiler-cli/src/transformers/util";
import {from, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private isAuthenticated: boolean = false;

  constructor(private router: Router) { }

  // login(username: string, password: string): boolean {
  //   if (username === 'admin@admin.com' && password === 'admin') {
  //     this.isAuthenticated = true;
  //     return true;
  //   }
  //   return false;
  // }

  login(email: string ,password: string): Observable<void> {

    const promise =  signInWithEmailAndPassword( this.firebaseAuth,
      email,
      password
    ).then(()=> {});
    return from(promise);
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
