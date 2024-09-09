import { Component } from '@angular/core';
import { Menu } from "../../../models/menu";

@Component({
  selector: 'app-delete-article-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-article-modal.component.html',
  styleUrls: ['./delete-article-modal.component.css', '../../../../assets/css/admin-styles.css']
})
export class DeleteArticleModalComponent {
@Input() menu!: Menu;
  @Output() close = new EventEmitter<void>();

  confirmDelete() {
    // Logique pour supprimer l'article
    console.log('Suppression de l\'article', this.menu);
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }
}
