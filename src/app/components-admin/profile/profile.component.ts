import {Component, inject} from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../assets/css/admin-styles.css']
})
export class ProfileComponent {
  authService = inject(AuthService);


  get firstName(): string {
    return this.authService.currentUserSig()?.username.split(' ')[0] || '';
  }

  get lastName(): string {
    return this.authService.currentUserSig()?.username.split(' ')[1] || '';
  }
}
