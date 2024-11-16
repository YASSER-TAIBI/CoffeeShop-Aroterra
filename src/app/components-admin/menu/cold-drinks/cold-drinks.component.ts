import {Component, inject, OnInit} from '@angular/core';
import {DialogComponent} from "../../../shared/components/dialog/dialog.component";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Menu, MenuEtat, MenuTypeArticle} from "../../../models/menu";
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
  file: File | null = null;

  //Pagination
  p: number = 1;
  searchText: string = '';
  selectedMenu: Menu | null = null;
  editForm: FormGroup;
  menuTypes = Object.values(MenuTypeArticle);
  menuEtats = Object.values(MenuEtat);
  id: number = 0 ;

  constructor(private fb: FormBuilder, public generalService: GeneralService) {
    this.editForm = this.fb.group({
      id: [''],
      imageUrl: ['', Validators.required],
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
      this.boissonsFroidesList = this.menuList.filter(menu => menu.typeArticle === 'Boissons Froides');
    });
  }

  get filteredColdDrinks(): Menu[] {
    return this.boissonsFroidesList = this.menuList.filter(menu =>
      menu.typeArticle === 'Boissons Froides' &&
      menu.article?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  openEditModal(menu: Menu) {
    const selectedMenu = menu;
    if (selectedMenu){
      this.editForm.patchValue({
        id: selectedMenu.id || '',
        imageUrl: selectedMenu.imageUrl || '',
        price: selectedMenu.price || '',
        article: selectedMenu.article || '',
        description: selectedMenu.description || '',
        typeArticle: selectedMenu.typeArticle || '',
        etat: selectedMenu.etat || ''
      })
    }else {
      console.error("Le menu sélectionné est null ou undefined");
    }
    this.generalService.showDialog= true;
  }

  openDeleteModal(menu: Menu){
    if (window.confirm('Voulez-vous vraiment supprimer cette Article ?')) {
      this.menuService.deleteReservation(menu.id!)
        .then(() => {
          alert('Article supprimée avec succès!');
          // Supprimez la réservation localement de la liste pour éviter un appel supplémentaire à Firestore
          this.menuList = this.menuList.filter(r => r.id !== menu.id);
        })
        .catch(error => {
          console.error('Error deleting article: ', error);
        });
    }
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
        this.editForm.patchValue({ imageUrl: reader.result as string });
      };
      reader.readAsDataURL(this.file);
    }
  }

  EditArticleMenu() {
    if (!this.editForm.valid) {
      alert('Remplir tous les champs de saisie !');
      return;
    }

    if (window.confirm('Voulez-vous continuer la modification de cet article !')) {
      const updatedMenu: Partial<Menu> = this.editForm.value;

      if (updatedMenu.id) {
        this.menuService.updateMenu(updatedMenu.id, updatedMenu)
          .then(() => {
            this.closeEditModal();
            alert('Article modifié avec succès!');
          })
          .catch(error => {
            alert('Erreur lors de la mise à jour de l\'article: '+error);
          });
      } else {
        alert('ID de l\'article manquant. Impossible de modifier l\'article.');
      }
    }
  }

  trackByFn(index: number, item: Menu): string {
    return item.id ? item.id : index.toString();  // Assurez-vous que 'id' est une propriété unique de chaque Menu
  }
}
