import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.css'
})
export class BaseModalComponent {
  constructor(private modalService: ModalService) {}
  @HostListener('document:keydown.escape')
  onEscape() {
    this.modalService.close();
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.modalService.close();
    }
  }
}
