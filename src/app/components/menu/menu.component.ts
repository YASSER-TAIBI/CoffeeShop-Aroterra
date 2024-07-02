import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgIf,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {

  @Input() showPageHeader: boolean = true;

  menu = {
    title:"Menu & Tarifs",
    urlPrevious:"Accueil",
    urlCurrent:"Menu",
    description: "Tarifs Compétitifs",

    groupMenuLeftTaps01: [
      { id:1,
        image:"menu-1.jpg",
        price:"5€",
        titre:"Café Noir",
        texte:"Profitez d'un café noir riche et intense, parfait pour commencer votre journée avec énergie."
      },
      { id:2,
        image:"menu-2.jpg",
        price:"7€",
        titre:"Café au Chocolat",
        texte:"Savourez la combinaison parfaite de café et de chocolat pour une expérience gourmande et réconfortante."
      },
      { id:3,
        image:"menu-3.jpg",
        price:"9€",
        titre:"Café Noir",
        texte:"Un café crémeux et doux, parfait pour ceux qui aiment leur café avec une touche de lait."
      }
    ],

    groupMenuRightTaps01: [
      { id:1,
        image:"menu-2.jpg",
        price:"7€",
        titre:"Café au Chocolat",
        texte:"Le mélange parfait de café et de chocolat, servi froid pour une pause gourmande et rafraîchissante."
      },
      { id:2,
        image:"menu-3.jpg",
        price:"9€",
        titre:"Café au Lait",
        texte:"Un café froid crémeux, idéal pour les amateurs de café au lait qui souhaitent une boisson rafraîchissante."
      },
      { id:3,
        image:"menu-1.jpg",
        price:"5€",
        titre:"Café Noir",
        texte:"Un café noir rafraîchissant, parfait pour se désaltérer tout en profitant d'une saveur intense."
      }
      ],

    groupMenuLeftTaps02: [
      { id:1,
        image:"menu-3.jpg",
        price:"9€",
        titre:"Café au Lait",
        texte:"Un café froid crémeux, idéal pour les amateurs de café au lait qui souhaitent une boisson rafraîchissante."
      },
      { id:2,
        image:"menu-1.jpg",
        price:"5€",
        titre:"Café Noir",
        texte:"Un café noir rafraîchissant, parfait pour se désaltérer tout en profitant d'une saveur intense."
      },
      { id:3,
        image:"menu-2.jpg",
        price:"7€",
        titre:"Café au Chocolat",
        texte:"Le mélange parfait de café et de chocolat, servi froid pour une pause gourmande et rafraîchissante."
      }
    ],

    groupMenuRightTaps02: [
      { id:1,
        image:"menu-1.jpg",
        price:"5€",
        titre:"Café Noir",
        texte:"Un café noir rafraîchissant, parfait pour se désaltérer tout en profitant d'une saveur intense."
      },
      { id:5,
        image:"menu-3.jpg",
        price:"9€",
        titre:"Café au Lait",
        texte:"Un café froid crémeux, idéal pour les amateurs de café au lait qui souhaitent une boisson rafraîchissante."
      },
      { id:6,
        image:"menu-2.jpg",
        price:"7€",
        titre:"Café au Chocolat",
        texte:"Le mélange parfait de café et de chocolat, servi froid pour une pause gourmande et rafraîchissante."
      }
    ],

    groupMenuLeftTaps03: [
      { id:1,
        image:"menu-2.jpg",
        price:"7€",
        titre:"Café au Chocolat",
        texte:"Le mélange parfait de café et de chocolat, servi froid pour une pause gourmande et rafraîchissante."
      },
      { id:2,
        image:"menu-1.jpg",
        price:"7€",
        titre:"Café au Lait",
        texte:"Un café froid crémeux, idéal pour les amateurs de café au lait qui souhaitent une boisson rafraîchissante."
      },
      { id:3,
        image:"menu-3.jpg",
        price:"9€",
        titre:"Café Noir",
        texte:"Un café noir rafraîchissant, parfait pour se désaltérer tout en profitant d'une saveur intense."
      }
    ],

    groupMenuRightTaps03: [
      { id:1,
        image:"menu-2.jpg",
        price:"7€",
        titre:"Café au Chocolat",
        texte:"Le mélange parfait de café et de chocolat, servi froid pour une pause gourmande et rafraîchissante."
      },
      { id:2,
        image:"menu-3.jpg",
        price:"5€",
        titre:"Café Noir",
        texte:"Un café noir rafraîchissant, parfait pour se désaltérer tout en profitant d'une saveur intense."
      },
      { id:3,
        image:"menu-1.jpg",
        price:"9€",
        titre:"Café au Lait",
        texte:"Un café froid crémeux, idéal pour les amateurs de café au lait qui souhaitent une boisson rafraîchissante."
      }
    ]

  }

  tabs = [
    { id: 'tabs-1', name: 'Boissons Chaudes', icon: './assets/img/tab-icon-01.png' },
    { id: 'tabs-2', name: 'Boissons froides', icon: './assets/img/tab-icon-02.png' },
    { id: 'tabs-3', name: 'Petit-déjeuner', icon: './assets/img/tab-icon-03.png' }
  ];

  selectedTab = this.tabs[0].id;

  selectTab(tabId: string): void {
    this.selectedTab = tabId;
  }
}
