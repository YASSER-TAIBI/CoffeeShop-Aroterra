import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../assets/css/admin-styles.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);


  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
