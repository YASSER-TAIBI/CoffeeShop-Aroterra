import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,
    RouterLinkActive,
    RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {

}
