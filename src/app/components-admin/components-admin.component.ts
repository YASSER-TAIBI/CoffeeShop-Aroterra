import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-components-admin',
  standalone: true,
    imports: [
        RouterOutlet
    ],
  templateUrl: './components-admin.component.html',
  styleUrl: './components-admin.component.css'
})
export class ComponentsAdminComponent {

}
