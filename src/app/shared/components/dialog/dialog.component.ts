import { Component } from '@angular/core';
import {GeneralService} from "../../services/general.service";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {


  constructor(public generalService: GeneralService) {}
}
