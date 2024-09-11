import {Component, inject, Input, TemplateRef} from '@angular/core';
import {Menu} from "../../../models/menu";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {DeleteArticleModalComponent} from "../delete-article-modal/delete-article-modal.component";
import {EditArticleModalComponent} from "../edit-article-modal/edit-article-modal.component";
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogComponent} from "../../../shared/components/dialog/dialog.component";
import {GeneralService} from "../../../shared/services/general.service";



@Component({
  selector: 'app-article-table',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FormsModule,
    NgOptimizedImage,
    DeleteArticleModalComponent,
    EditArticleModalComponent,
    NgbDatepickerModule,
    NgIf,
    DialogComponent
  ],
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css',  '../../../../assets/css/admin-styles.css']
})
export class ArticleTableComponent {
  @Input() menuList: Menu[] = [];
  @Input() tableTitle: string = '';
  @Input() tableImage: string = '';

  //Pagination
  p: number = 1;
  searchText: string = '';
  selectedMenu: Menu | null = null;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;

  constructor(public generalService: GeneralService) {}


  openEditModal(menu: Menu) {
        this.selectedMenu = menu;
        this.isEditModalOpen = true;
    }

  openModal(){

  }

  openDeleteModal(menu: any) {

    this.selectedMenu = menu;
    this.isDeleteModalOpen = true;
    }

  closeEditModal() {
    this.selectedMenu = null; // Ferme le modal
    }

    closeDeleteModal() {
      this.isDeleteModalOpen = false;
    }

   trackById(index: number, item: any): number {
    return item.id;
  }
}
