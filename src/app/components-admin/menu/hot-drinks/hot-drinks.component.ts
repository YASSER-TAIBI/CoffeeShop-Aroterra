import {Component, inject, OnInit} from '@angular/core';
import {DialogComponent} from "../../../shared/components/dialog/dialog.component";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Menu, MenuEtat, MenuTypeArticle} from "../../../models/menu";
import {GeneralService} from "../../../shared/services/general.service";
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-hot-drinks',
  standalone: true,
  imports: [
    DialogComponent,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './hot-drinks.component.html',
  styleUrls: ['./hot-drinks.component.css', '../../../../assets/css/admin-styles.css']
})
export class HotDrinksComponent  implements OnInit {

  menuList: Menu[] = [];
  boissonsChaudesList: Menu[] = [];
  tableTitle: string ="Boissons Chaudes";
  tableImage: string ="./assets/img/tab-icon-01.png";
  file: File | null = null;
  id: number = 0 ;

  //Pagination
  p: number = 1;
  searchText: string = '';
  selectedMenu: Menu | null = null;
  editForm: FormGroup;
  menuTypes = Object.values(MenuTypeArticle);
  menuEtats = Object.values(MenuEtat);

  constructor(private fb: FormBuilder, public generalService: GeneralService) {
    this.editForm = this.fb.group({
      id: [''],
      imageUrl: [''],
      price: [null, Validators.required],
      article: ['', Validators.required],
      description: ['', Validators.required],
      typeArticle: [null, Validators.required],
      etat: [null, Validators.required]

    });
  }

  menuService = inject(MenuService);

  ngOnInit(): void {
    this.menuService.getMenu().subscribe((data: Menu[]) => {
      this.menuList = data;

      // Filtrer les données selon le type d'article
      this.boissonsChaudesList = this.menuList.filter(menu => menu.typeArticle === 'Boissons Chaudes');
    });
  }

  openEditModal(menu: Menu, id: number) {
    console.log('Selected Menu:', menu);
    console.log('id:', id);
    const selectedMenu = menu; // Set the selected menu
    if (selectedMenu){

      console.log(selectedMenu);
      this.editForm.patchValue({
        id: selectedMenu.id || '',
        imageUrl: selectedMenu.imageUrl || '',
        price: selectedMenu.price || '',
        article: selectedMenu.article || '',
        description: selectedMenu.description || '',
        typeArticle: selectedMenu.typeArticle || '',
        etat: selectedMenu.etat || ''
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

  onSelectPhoto(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.editForm.patchValue({ imgUrl: reader.result as string });
      };
      reader.readAsDataURL(this.file);
    }
  }

  trackByFn(index: number, item: Menu): string {
    return item.id ? item.id : index.toString();  // Assurez-vous que 'id' est une propriété unique de chaque Menu
  }

  EditArticleMenu() {
    if (window.confirm('Voulez-vous continuer la modification de cet article !')) {
      console.log('Entrée dans la fonction EditArticleMenu');

      const updatedMenu: Partial<Menu> = this.editForm.value;

      console.log('Données de l\'article modifié:', updatedMenu);

      if (updatedMenu.id) {  // Vérifiez que updatedMenu.id est défini
        this.menuService.updateMenu(updatedMenu.id, updatedMenu)
          .then(() => {
            alert('Article modifié avec succès!');
            console.log('Article mis à jour avec succès!');
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour de l\'article:', error);
          });
      } else {
        console.error('Erreur : L\'ID de l\'article est manquant.');
        alert('ID de l\'article manquant. Impossible de modifier l\'article.');
      }
    }
  }

}
