import {Component, inject, Input, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

  @Input() showPageHeader: boolean = true;
  fb = inject(FormBuilder);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email:['', Validators.required],
    password: ['', Validators.required],
  });

  login = {
    title:"Espace Admin",
    urlPrevious:"Accueil",
    urlCurrent:"Login",
    description: "Veuillez vous connecter pour accéder au panneau d’administration",
}

  constructor(
    private authService: AuthService) {}
  errorMessage: string | null = null;

  onLogin() {
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        console.log('passed');
      },
      error: (err) => {
        console.log('no passed');
        this.errorMessage = err.code;
        // this.router.navigate(['/accueil']);
      },
    });
  }
}
