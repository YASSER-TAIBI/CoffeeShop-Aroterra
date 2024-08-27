import {Component, Input} from '@angular/core';
import {Menu} from "../../../models/menu";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-article-table',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FormsModule,
    NgOptimizedImage
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
  ngOnInit(): void {}

  EditMenu(menu: Menu){}

  DeleteMenu(menu: Menu) {}
}
