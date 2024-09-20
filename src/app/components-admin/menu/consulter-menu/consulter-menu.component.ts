import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {Menu} from "../../../models/menu";
import {ArticleTableComponent} from "../article-table/article-table.component";
import {MenuService} from "../../../services/menu.service";
import {DialogComponent} from "../../../shared/components/dialog/dialog.component";

@Component({
  selector: 'app-consulter-menu',
  standalone: true,
  imports: [
    FormsModule,
    ArticleTableComponent,
    DialogComponent,
  ],
  templateUrl: './consulter-menu.component.html',
  styleUrls: ['./consulter-menu.component.css',  '../../../../assets/css/admin-styles.css']
})
export class ConsulterMenuComponent  implements OnInit {
  menuList: Menu[] = [];
  petitDejeunerList: Menu[] = [];
  boissonsChaudesList: Menu[] = [];
  boissonsFroidesList: Menu[] = [];
  id: number = 0;

  menuService = inject(MenuService);

  ngOnInit(): void {
    this.menuService.getMenu().subscribe((data: Menu[]) => {
      this.menuList = data;

      // Filtrer les données selon le type d'article
      this.petitDejeunerList = this.menuList.filter(menu => menu.typeArticle === 'Petit-déjeuner');
      this.boissonsChaudesList = this.menuList.filter(menu => menu.typeArticle === 'Boissons Chaudes');
      this.boissonsFroidesList = this.menuList.filter(menu => menu.typeArticle === 'Boissons Froides');
    });
  }
}
