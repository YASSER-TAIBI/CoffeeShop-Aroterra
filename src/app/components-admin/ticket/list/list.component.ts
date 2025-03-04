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

  isDefaultList(title: string): boolean {
    const defaultTitles = ['À faire', 'En Cours', 'Révision', 'Test', 'Terminé🎉'];
    return defaultTitles.includes(title);
  }

  addCard() {
    // Fonction pour générer le titre automatiquement
    const generateTitle = (counter: number) => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0'); // Jour (dd)
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Mois (MM)
      const year = String(now.getFullYear()).slice(-2); // Année (YY)

      const counterStr = String(counter).padStart(3, '0'); // Formatage du compteur (001)
      return `CSA${day}${month}${year}-${counterStr}`; // Retourner le titre généré
    };

    // Récupérer le dernier counter utilisé dans la liste de cartes
    const getLastCounter = (): Promise<number> => {
      return new Promise<number>((resolve) => {
        this.boardService.getBoards().subscribe((boards) => {
          if (boards.length > 0) {
            // Récupérer tous les counters de toutes les cartes dans tous les boards
            const allCounters = boards.flatMap(board =>
              board.lists.flatMap(list => list.cards.map(card => card.counter))
            );

            if (allCounters.length > 0) {
              resolve(Math.max(...allCounters) + 1); // Incrémenter le dernier counter global
              return;
            }
          }
          resolve(1); // Si aucune carte n'existe, initialiser à 1
        });
      });
    };

    // Attendre que le dernier counter soit récupéré
    getLastCounter().then((counter) => {
      const title = generateTitle(counter); // Générer le titre avec le bon counter

      console.log("counter", counter);
      console.log("title", title);

      Swal.fire({
        title: "Nouvelle carte",
        html: `
      <div class="form-table">
          <label for="swal-title" class="form-label">Titre</label>
          <input type="text" class="form-control" id="swal-title" name="title" value="${title}" readonly />

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
        preConfirm: () => {
          const title = (document.getElementById("swal-title") as HTMLInputElement).value;
          const description = (document.getElementById("swal-description") as HTMLTextAreaElement).value;
          const type = (document.getElementById("swal-type") as HTMLSelectElement).value;
          const priorite = (document.getElementById("swal-priorite") as HTMLSelectElement).value;

          if (!title || !description || !type || !priorite) {
            Swal.showValidationMessage("Tous les champs sont obligatoires !");
            return false;
          }
          return { title, description, type, priorite, counter };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.boardService.addCard(
            this.boardId,
            this.list.id,
            result.value.title,
            result.value.counter, // Utiliser le bon counter
            result.value.description,
            result.value.type,
            result.value.priorite
          );
          Swal.fire("Succès", "Une nouvelle carte a été créée !", "success");
        }
      });
    });
  }

  deleteList() {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Voulez-vous supprimer cette liste ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da9f5b",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Oui, supprimez-le !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.boardService.deleteList(this.boardId, this.list.id);
        Swal.fire("Supprimé!", "La liste a été supprimée.", "success");
      }
    });
  }
}
