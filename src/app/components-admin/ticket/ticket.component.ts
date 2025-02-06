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
        <input id="swal-input-title" class="custom-input" placeholder="Titre">
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
        const title = (
          document.getElementById("swal-input-title") as HTMLInputElement
        ).value;

        if (!title) {
          Swal.showValidationMessage("Le champ et obligatoire !");
          return false;
        }
        return { title };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.boardService.addBoard(result.value.title);
        Swal.fire("Succès", "Un nouveau tableau a été créé !", "success");
      }
    });

  }

}
