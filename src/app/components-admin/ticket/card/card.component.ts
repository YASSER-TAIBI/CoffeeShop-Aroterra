import { Component, Input  } from '@angular/core';
import { Card } from '../../../models/card';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../../services/board.service';
import {ModalService} from "../../../services/modal.service";
import {CardModalComponent} from "../../../shared/modals/card-modal/card-modal.component";
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() card!: Card;

  constructor(
    private boardService: BoardService,
    private modalService: ModalService
  ) {}

  onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('cardId', this.card.id);
      event.dataTransfer.setData('listId', this.card.listId);
    }
  }

  async deleteCard(event: Event) {
    event.stopPropagation();
    if (confirm('Voulez-vous supprimer cette carte ?')) {
      this.boardService.deleteCard(this.card.id);
    }
  }

  async editCard() {
    const result = await this.modalService.open(CardModalComponent, {
      card: this.card
    });

    if (result) {
      // Note: We need to add an updateCard method to the BoardService
      this.boardService.updateCard(this.card.id, result.title, result.description);
    }
  }
}
