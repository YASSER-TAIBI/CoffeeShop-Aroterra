import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import {BoardService} from "../../services/board.service";
import {ModalService} from "../../services/modal.service";
import {BoardModalComponent} from "../../shared/modals/board-modal/board-modal.component";
@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  constructor(private boardService: BoardService,
              private modalService: ModalService) {}

  async addNewBoard() {
    const result = await this.modalService.open(BoardModalComponent);
    if (result) {
      this.boardService.addBoard(result);
    }
  }

}
