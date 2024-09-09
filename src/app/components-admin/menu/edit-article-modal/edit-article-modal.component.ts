import { Component } from '@angular/core';
import { Menu } from "../../../models/menu";

@Component({
  selector: 'app-edit-article-modal',
  standalone: true,
  imports: [],
  templateUrl: './edit-article-modal.component.html',
  styleUrls: ['./edit-article-modal.component.css', '../../../../assets/css/admin-styles.css']
})
export class EditArticleModalComponent implements OnInit {
  @Input() menu!: Menu;
  @Output() close = new EventEmitter<void>();
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      typeArticle: [this.menu?.typeArticle],
      article: [this.menu?.article],
      price: [this.menu?.price],
      description: [this.menu?.description]
    });
  }

  onSubmit() {
    // Logique pour soumettre les modifications
    console.log('Formulaire soumis', this.editForm.value);
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }
}
