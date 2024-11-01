import {Component, inject, OnInit} from '@angular/core';
import {DialogComponent} from "../../../shared/components/dialog/dialog.component";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Menu, MenuTypeArticle} from "../../../models/menu";
import {GeneralService} from "../../../shared/services/general.service";
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-cold-drinks',
  standalone: true,
  imports: [
    DialogComponent,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './cold-drinks.component.html',
  styleUrls: ['./cold-drinks.component.css', '../../../../assets/css/admin-styles.css']
})
export class ColdDrinksComponent  implements OnInit {

  menuList: Menu[] = [];
  boissonsFroidesList: Menu[] = [];
  tableTitle: string ="Boissons Froides";
  tableImage: string ="./assets/img/tab-icon-02.png";
  id: number = 0 ;

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

  menuService = inject(MenuService);

  ngOnInit(): void {
    this.menuService.getMenu().subscribe((data: Menu[]) => {
      this.menuList = data;

      // Filtrer les données selon le type d'article
      this.boissonsFroidesList = this.menuList.filter(menu => menu.typeArticle === 'Boissons Froides');
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
