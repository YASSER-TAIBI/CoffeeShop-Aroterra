import {Component, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-components-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './components-admin.component.html',
  styleUrls: ['./components-admin.component.css', '../../assets/css/admin-styles.css'],
  encapsulation: ViewEncapsulation.Emulated // Adjust as needed
})
export class ComponentsAdminComponent {

}
