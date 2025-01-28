import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../../services/board.service';
import { ListComponent } from '../list/list.component';
import {ModalService} from "../../../services/modal.service";
import {ListModalComponent} from "../../../shared/modals/list-modal/list-modal.component";
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  boards = this.boardService.getBoards();

  constructor(
    private boardService: BoardService,
    private modalService: ModalService
  ) {}

  async addList(boardId: string) {
    const result = await this.modalService.open(ListModalComponent);
    if (result) {
      this.boardService.addList(boardId, result);
    }
  }

  deleteBoard(boardId: string) {
    if (confirm('Voulez-vous supprimer ce tableau ?')) {
      this.boardService.deleteBoard(boardId);
    }
  }
}
