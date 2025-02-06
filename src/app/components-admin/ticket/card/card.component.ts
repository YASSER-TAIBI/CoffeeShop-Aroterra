import {Component, Input, OnInit} from '@angular/core';
import {Card, CardType, List} from '../../../models/board';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../../services/board.service';
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() boardId!: string;

  formData: { title: string; description: string; type: CardType } = {
    title: '',
    description: '',
    type: 'Bug'
  };

  constructor(
    private boardService: BoardService
  ) {}

  ngOnInit() {
    if (this.card) {
      this.formData = {
        title: this.card.title,
        description: this.card.description,
        type: this.card.type
      };
    }
  }

  onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('cardId', this.card.id);
      event.dataTransfer.setData('IdList', this.card.IdList);
    }
  }

  getPrioriteImage(): string {
    const images: { [key: string]: string } = {
      'Bloquant': '../../../../assets/img/bloquant.png',
      'Urgent': '../../../../assets/img/urgent.png',
      'Court-terme': '../../../../assets/img/court-terme.png',
      'Long-terme': '../../../../assets/img/long-terme.png'
    };

    return images[this.card.priorite] || ''; // Retourne une image vide si aucune correspondance
  }

  async deleteCard(event: Event) {
    event.stopPropagation();
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Voulez-vous supprimer cette carte ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.boardService.deleteCard(this.boardId, this.card.IdList, this.card.id);
        Swal.fire("Supprimé!", "Le tableau a été supprimée.", "success");
      }
    });
  }

  editCard() {
    Swal.fire({
      title: "Modifier la carte",
      html: `
      <div class="form-table">
          <label for="swal-title" class="form-label">Titre</label>
          <input type="text" class="form-control" id="swal-title" name="title" placeholder="Entrez un titre" value="${this.card.title}"/>

          <label for="swal-description" class="form-label">Description</label>
          <textarea class="form-control" id="swal-description" name="description" placeholder="Entrez une description" rows="3">${this.card.description}</textarea>

          <label for="swal-type" class="form-label">Type de carte</label>
          <select class="form-select" id="swal-type" name="type">
            <option value="Evol" ${this.card.type === "Evol" ? "selected" : ""}>Évolution</option>
            <option value="Bug" ${this.card.type === "Bug" ? "selected" : ""}>Bug</option>
          </select>

          <label for="swal-priorite" class="form-label">Priorité</label>
          <select class="form-select" id="swal-priorite" name="priorite">
            <option value="Bloquant">Bloquant</option>
            <option value="Urgent">Urgent</option>
            <option value="Court-terme">Court-terme</option>
            <option value="Long-terme">Long-terme</option>
          </select>
      </div>
        `,
      showCancelButton: true,
      confirmButtonText: "Modifier",
      cancelButtonText: "Annuler",
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
      preConfirm: () => {
        const title = (document.getElementById("swal-title") as HTMLInputElement).value;
        const description = (document.getElementById("swal-description") as HTMLTextAreaElement).value;
        const type = (document.getElementById("swal-type") as HTMLSelectElement).value;
        const priorite = (document.getElementById("swal-priorite") as HTMLSelectElement).value;

        if (!title || !description || !type || !priorite) {
          Swal.showValidationMessage("Tous les champs sont obligatoires !");
          return false;
        }

        return { title, description, type, priorite };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.boardService.updateCard(this.boardId, this.card.IdList, this.card.id, result.value.title, result.value.description, result.value.type, result.value.priorite );
        Swal.fire("Succès", "La carte a été bien modifiée !", "success");
      }
    });
  }
}
