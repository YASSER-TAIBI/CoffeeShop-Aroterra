import {Component, Input} from '@angular/core';
import {Menu} from "../../../models/menu";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import { DeleteArticleModalComponent } from '../delete-article-modal/delete-article-modal.component';  // Assurez-vous que les imports sont corrects
import { EditArticleModalComponent } from '../edit-article-modal/edit-article-modal.component';

@Component({
  selector: 'app-article-table',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FormsModule,
    NgOptimizedImage,
    DeleteArticleModalComponent,
    EditArticleModalComponent
  ],
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css',  '../../../../assets/css/admin-styles.css']
})
export class ArticleTableComponent {
  @Input() menuList: Menu[] = [];
  @Input() tableTitle: string = '';
  @Input() tableImage: string = '';

  selectedMenu: any = null;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;

  //Pagination
   p: number = 1;

   searchText: string = '';
  ngOnInit(): void {}

  openEditModal(menu: any) {
    this.selectedMenu = menu;
    this.isEditModalOpen = true;
    }

  openDeleteModal(menu: any) {
    this.selectedMenu = menu;
    this.isDeleteModalOpen = true;
    }

  closeEditModal() {
      this.isEditModalOpen = false;
    }

    closeDeleteModal() {
      this.isDeleteModalOpen = false;
    }

   trackById(index: number, item: any): number {
    return item.id;
  }
}
