import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {Menu, MenuTypeArticle} from "../../models/menu";
import {MenuService} from "../../services/menu.service";


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgIf,
    NavbarComponent,
    FooterComponent,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent implements OnInit {

  @Input() showPageHeader: boolean = true;

  menu = {
    title:"Menu & Tarifs",
    urlPrevious:"Accueil",
    urlCurrent:"Menu",
    description: "Tarifs Compétitifs",

  }

  tabs = [
    { id: 'tabs-1', name: 'Boissons Chaudes', icon: './assets/img/tab-icon-01.png', typeArticle: MenuTypeArticle.BoissonsChaudes  },
    { id: 'tabs-2', name: 'Boissons Froides', icon: './assets/img/tab-icon-02.png', typeArticle: MenuTypeArticle.BoissonsFroides  },
    { id: 'tabs-3', name: 'Petit-déjeuner', icon: './assets/img/tab-icon-03.png', typeArticle: MenuTypeArticle.PetitDejeuner  }
  ];

  selectedTab = this.tabs[0].id;

  menuItems: Menu[] = [];
  filteredMenuItems: { left: Menu[], right: Menu[] } = { left: [], right: [] };

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    // Récupération des données depuis Firestore
    this.menuService.getMenu().subscribe(menuItems => {
      this.menuItems = menuItems;
      this.filterMenuItems();
    });
  }

  selectTab(tabId: string): void {
    this.selectedTab = tabId;
    this.filterMenuItems();
  }

  // Filtrer les éléments de menu en fonction de l'onglet sélectionné
  filterMenuItems(): void {
    const currentTab = this.tabs.find(tab => tab.id === this.selectedTab);
    if (currentTab) {
      const filtered = this.menuItems.filter(item => item.typeArticle === currentTab.typeArticle && item.etat === "Disponible");

      // Répartir les éléments dans les listes gauche et droite
      this.filteredMenuItems.left = filtered.filter((_, index) => index % 2 === 0);
      this.filteredMenuItems.right = filtered.filter((_, index) => index % 2 !== 0);
    }
  }

}
