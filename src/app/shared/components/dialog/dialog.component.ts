import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GeneralService} from "../../services/general.service";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css',  '../../../../assets/css/admin-styles.css']
})
export class DialogComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() confirmAction = new EventEmitter<void>();
  @Output() closeAction = new EventEmitter<void>();
  @Input() cancelButtonText: string = '';
  @Input() confirmButtonText: string = '';
  @Input() id: number =0;



  constructor(public generalService: GeneralService) {}

  close() {
    this.generalService.showDialog = false;
    this.closeAction.emit();
  }

  confirm() {
    this.confirmAction.emit();
    this.close();  // Ferme après la confirmation
  }
}
