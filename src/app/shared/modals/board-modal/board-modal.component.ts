import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ModalService } from '../../../services/modal.service';
import { ModalComponent } from '../../../services/modal.service';

@Component({
  selector: 'app-board-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseModalComponent],
  templateUrl: './board-modal.component.html',
  styleUrl: './board-modal.component.css'
})
export class BoardModalComponent  implements ModalComponent {
  title: string = '';
  data: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    if (this.data?.board) {
      this.title = this.data.board.title;
    }
  }

  onCancel() {
    this.modalService.close(null);
  }

  onConfirm() {
    if (this.title.trim()) {
      this.modalService.close(this.title.trim());
    }
  }
}
