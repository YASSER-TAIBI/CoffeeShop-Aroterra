import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', '../../../assets/css/admin-styles.css']
})
export class SidebarComponent {

  constructor( public authService: AuthService) { }

}
