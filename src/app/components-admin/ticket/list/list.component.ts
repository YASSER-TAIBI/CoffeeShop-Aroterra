import {Component, Input} from '@angular/core';
import {Board, List} from '../../../models/board';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import {BoardService} from "../../../services/board.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() list!: List;
  @Input() boardId!: string;

  constructor(
    private boardService: BoardService
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      const cardId = event.dataTransfer.getData('cardId');
      const fromListId = event.dataTransfer.getData('IdList');
      if (fromListId !== this.list.id) {
        this.boardService.moveCard(cardId, fromListId, this.list.id, this.boardId);
      }
    }
  }

  addCard() {
    Swal.fire({
      title: "Nouvelle carte",
      html: `
      <div class="form-table" >
          <label for="swal-title" class="form-label">Titre</label>
          <input type="text" class="form-control" id="swal-title" name="title" placeholder="Entrez un titre"/>


          <label for="swal-description" class="form-label">Description</label>
          <textarea class="form-control" id="swal-description" name="description" placeholder="Entrez une description" rows="3"></textarea>


          <label for="swal-type" class="form-label">Type de carte</label>
          <select class="form-select" id="swal-type" name="type">
            <option value="Evol">Évolution</option>
            <option value="Bug">Bug</option>
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
      confirmButtonText: "Créer",
      cancelButtonText: "Annuler",
      customClass: {
        popup: "custom-swal-popup", // Style du modal
        confirmButton: "custom-confirm-button", // Style du bouton "Créer"
        cancelButton: "custom-cancel-button", // Style du bouton "Annuler"
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
        this.boardService.addCard(this.boardId, this.list.id, result.value.title, result.value.description, result.value.type, result.value.priorite);
        Swal.fire("Succès", "Un nouveau carte a été créé !", "success");
      }
    });
  }

  deleteList() {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Voulez-vous supprimer cette liste ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.boardService.deleteList(this.boardId, this.list.id);
        Swal.fire("Supprimé!", "La liste a été supprimée.", "success");
      }
    });
  }
}
