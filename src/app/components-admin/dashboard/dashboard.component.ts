import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../assets/css/admin-styles.css']
})
export class DashboardComponent {

}
