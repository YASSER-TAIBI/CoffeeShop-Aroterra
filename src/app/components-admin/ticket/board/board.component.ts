import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../../services/board.service';
import { ListComponent } from '../list/list.component';
import Swal from "sweetalert2";
import {Board} from "../../../models/board";
import { Observable, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  private boardSubject = new BehaviorSubject<Board[]>([]);
  boards$: Observable<Board[]> = this.boardSubject.asObservable();

  constructor(
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
      this.getBoardList();
  }

  getBoardList(): void {
    this.boardService.getBoards().subscribe(data => {
      if (data) {
        console.log("Data retrieved:", data);
        // Émettre les nouvelles données dans le BehaviorSubject
        this.boardSubject.next(data.map(board => ({
          id: board.id,
          ...board
        })));
      } else {
        console.log("Aucun board trouvé");
      }
    });
  }

  async addList(boardId: string | undefined ) {
    if (!boardId) {
      console.error("boardId est indéfini !");
      return;
    }

    Swal.fire({
      title: "Nouvelle Liste",
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
        this.boardService.addList(boardId, result.value.title)
            .then(() => Swal.fire("Succès", "Un nouveau liste a été créé !", "success"))
            .catch((error) => Swal.fire("Erreur", error.message, "error"));
      }
    });

  }

  deleteBoard(boardId: string) {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Voulez-vous supprimer ce Tableau ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.boardService.deleteBoard(boardId)
          .then(() => Swal.fire("Supprimé!", "Le tableau a été supprimé.", "success"))
          .catch(error => Swal.fire("Erreur", "La suppression a échoué.", "error"));
      }
    });
  }
}
