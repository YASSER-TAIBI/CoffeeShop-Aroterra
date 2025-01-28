import {Component, Input} from '@angular/core';
import {List} from "../../../models/list";
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import {BoardService} from "../../../services/board.service";
import {CardModalComponent} from "../../../shared/modals/card-modal/card-modal.component";
import {ModalService} from "../../../services/modal.service";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() list!: List;

  constructor(
    private boardService: BoardService,
    private modalService: ModalService
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      const cardId = event.dataTransfer.getData('cardId');
      const fromListId = event.dataTransfer.getData('listId');
      if (fromListId !== this.list.id) {
        this.boardService.moveCard(cardId, fromListId, this.list.id);
      }
    }
  }

  async addCard() {
    const result = await this.modalService.open(CardModalComponent);
    if (result) {
      this.boardService.addCard(this.list.id, result.title, result.description);
    }
  }

  async deleteList() {
    if (confirm('Voulez-vous supprimer cette liste ?')) {
      this.boardService.deleteList(this.list.id);
    }
  }
}
