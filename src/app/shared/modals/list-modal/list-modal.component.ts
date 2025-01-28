import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ModalService } from '../../../services/modal.service';
import { ModalComponent } from '../../../services/modal.service';
@Component({
  selector: 'app-list-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseModalComponent],
  templateUrl: './list-modal.component.html',
  styleUrl: './list-modal.component.css'
})
export class ListModalComponent implements ModalComponent {
  title: string = '';
  data: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    if (this.data?.list) {
      this.title = this.data.list.title;
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
