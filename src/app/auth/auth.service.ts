import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    // Implémentez votre logique de connexion ici
    if (username === 'admin@admin.com' && password === 'admin') {
      this.isAuthenticated = true;
     // this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
