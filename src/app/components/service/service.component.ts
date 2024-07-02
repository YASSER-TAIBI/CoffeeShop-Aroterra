import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    NgIf,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceComponent {

  @Input() showPageHeader: boolean = true;

  service = {
    title:"Nos Services",
    urlPrevious:"Accueil",
    urlCurrent:"Service",
    description: "Grains Frais & Organiques",
    groupServices: [
      {id:1, titre:"Livraison Rapide", icon:"fa-truck", image:"service-1.jpg", texte:"Profitez de notre service de livraison rapide et fiable. Nous nous assurons que vos commandes arrivent à temps, directement à votre porte."},
      {id:2, titre:"Grains de Café Frais", icon:"fa-coffee", image:"service-2.jpg", texte:"Nous sélectionnons et torréfions les meilleurs grains de café pour garantir une fraîcheur et une saveur incomparables dans chaque tasse."},
      {id:3, titre:"Café de la Meilleure Qualité", icon:"fa-award", image:"service-3.jpg", texte:"Nous nous engageons à offrir un café de la plus haute qualité. Nos experts veillent à ce que chaque grain soit parfait pour une expérience gustative exceptionnelle."},
      {id:4, titre:"Réservation de Table en Ligne", icon:"fa-table", image:"service-4.jpg", texte:"Réservez votre table en ligne facilement et rapidement. Profitez d'un service personnalisé et assurez-vous d'avoir une place à chaque visite."}
    ]
  }

}
