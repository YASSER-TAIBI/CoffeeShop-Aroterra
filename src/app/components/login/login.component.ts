import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
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


  onLogin() {
    console.log("onLogin: ",this.username , this.password );
    if (this.authService.login(this.username, this.password)) {
      console.log('passed');
      this.router.navigate(['/dashboard']);
    }else{
      console.log('no passed');
      this.router.navigate(['/accueil']);
    }
  }

}
