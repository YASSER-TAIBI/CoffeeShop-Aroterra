import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Input() showPageHeader: boolean = true;

    username: string ='';
    password: string = '';


  login = {
    title:"Espace Admin",
    urlPrevious:"Accueil",
    urlCurrent:"Login",
    description: "Veuillez vous connecter pour accéder au panneau d’administration",
}

constructor(
  private router: Router,
  private authService: AuthService) {}

  onLogintmp() {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'admin';

    if (this.username === adminEmail && this.password === adminPassword) {
      console.log('Login successful as Admin');
     // this.router.navigate(['/dashboard']);
      // Code to redirect to admin dashboard or show admin content
    } else {
      console.log('Login failed');
      this.router.navigate(['accueil']);
      // Code to show login error message
    }
  }


  onLogin() {
    console.log("onLogin: ",this.username , this.password );
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/accueil']);
    }
  }

}
