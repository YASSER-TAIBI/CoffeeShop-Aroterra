import {Component, inject, Input, TemplateRef} from '@angular/core';
import {Menu, MenuTypeArticle} from "../../../models/menu";
import {NgxPaginationModule} from "ngx-pagination";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
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
    DialogComponent,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css',  '../../../../assets/css/admin-styles.css']
})
export class ArticleTableComponent {
  @Input() menuList: Menu[] = [];
  @Input() tableTitle: string = '';
  @Input() tableImage: string = '';
  @Input() id: number = 0 ;

  //Pagination
  p: number = 1;
  searchText: string = '';
  selectedMenu: Menu | null = null;
  editForm: FormGroup;
  menuTypes = Object.values(MenuTypeArticle);
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;

  constructor(private fb: FormBuilder, public generalService: GeneralService) {
    this.editForm = this.fb.group({
      imgUrl: [''],
      prc: [''],
      art: [''],
      desc: [''],
      typeArt: ['']
    });
  }


  openEditModal(menu: Menu, id: number) {
    console.log('Selected Menu:', menu);
    console.log('id:', id);
    const selectedMenu = menu; // Set the selected menu
    if (selectedMenu){

      console.log(selectedMenu);
      this.editForm.patchValue({
        imgUrl: selectedMenu.imageUrl || '',
        prc: selectedMenu.price || '',
        art: selectedMenu.article || '',
        desc: selectedMenu.description || '',
        typeArt: selectedMenu.typeArticle || ''
      })
      console.log(this.editForm);
    }else {
      console.error("Le menu sélectionné est null ou undefined");
    }

    this.generalService.showDialog= true;
    }

  closeEditModal() {
    this.editForm.reset();
    this.selectedMenu = null;
    this.generalService.showDialog= false;
    }

  trackByFn(index: number, item: Menu): string {
    return item.id ? item.id : index.toString();  // Assurez-vous que 'id' est une propriété unique de chaque Menu
  }


}
