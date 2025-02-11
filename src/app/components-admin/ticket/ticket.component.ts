import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import {BoardService} from "../../services/board.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  constructor(private boardService: BoardService) {}

   NewBoard() {
    Swal.fire({
      title: "Nouveau tableau",
      html: `
      <div class="form-table" >
        <label for="swal-title" class="form-label">Titre</label>
         <input type="text" class="form-control" id="swal-title" name="title" placeholder="Entrez un titre"/>
      </div>
        `,
      showCancelButton: true,
      confirmButtonText: "Créer",
      cancelButtonText: "Annuler",
      customClass: {
        title: "custom-title",
        popup: "custom-swal-popup", // Style du modal
        confirmButton: "custom-confirm-button", // Style du bouton "Créer"
        cancelButton: "custom-cancel-button", // Style du bouton "Annuler"
      },
      preConfirm: () => {
        const title = (document.getElementById("swal-title") as HTMLInputElement).value;

        if (!title) {
          Swal.showValidationMessage("Le champ et obligatoire !");
          return false;
        }
        return { title };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const boardId = await this.boardService.addBoard(result.value.title);
        await Swal.fire("Succès", `Un nouveau tableau (ID: ${boardId}) a été créé avec 5 listes !`, "success");
      }
    });

  }

}
