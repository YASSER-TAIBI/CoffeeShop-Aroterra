import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ModalService } from '../../../services/modal.service';
import { ModalComponent } from '../../../services/modal.service';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseModalComponent],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent implements ModalComponent {
  title: string = '';
  description: string = '';
  data: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    if (this.data?.card) {
      this.title = this.data.card.title;
      this.description = this.data.card.description;
    }
  }

  onCancel() {
    this.modalService.close(null);
  }

  onConfirm() {
    if (this.title.trim() && this.description.trim()) {
      this.modalService.close({
        title: this.title.trim(),
        description: this.description.trim()
      });
    }
  }
}
