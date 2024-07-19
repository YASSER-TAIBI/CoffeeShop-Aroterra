import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {User} from "../models/user"
import {error} from "@angular/compiler-cli/src/transformers/util";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(private router: Router, private auth: Auth) { }

  // login(username: string, password: string): boolean {
  //   if (username === 'admin@admin.com' && password === 'admin') {
  //     this.isAuthenticated = true;
  //     return true;
  //   }
  //   return false;
  // }

  login(user: User) {

    return signInWithEmailAndPassword(this.auth, user.email, user.password).then(()=>{
      alert("Login Successful")
      this.router.navigate(['/dashboard']);

    }).catch((error)=>{
      console.log("Error:", error);
      alert("Incorrect email or password")
    })
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
