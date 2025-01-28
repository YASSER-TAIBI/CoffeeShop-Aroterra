import { Component } from '@angular/core';
import {BoardService} from "../../../services/board.service";
import { CommonModule } from '@angular/common';
import {ModalService} from "../../../services/modal.service";
import {BoardModalComponent} from "../../../shared/modals/board-modal/board-modal.component";
import {BoardComponent} from "../board/board.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
