import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";


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

  loginObj = {
    EmailId: '',
    Password: ''
  };

  login = {
    title:"Espace Admin",
    urlPrevious:"Accueil",
    urlCurrent:"Login",
    description: "Veuillez vous connecter pour accéder au panneau d’administration",
}

  onLogin() {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'admin';

    if (this.loginObj.EmailId === adminEmail && this.loginObj.Password === adminPassword) {
      console.log('Login successful as Admin');
      // Code to redirect to admin dashboard or show admin content
    } else {
      console.log('Login failed');
      // Code to show login error message
    }
  }

}
