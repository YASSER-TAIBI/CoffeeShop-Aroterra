import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {

  @Input() showPageHeader: boolean = true;

  service = {
    title:"Nos Services",
    urlPrevious:"Accueil",
    urlCurrent:"Service",
    description: "Grains Frais & Organiques",
    groupServices: [
      {id:1, titre:"Livraison Rapide", icon:"fa-truck", image:"service-1.jpg", text:"Profitez de notre service de livraison rapide et fiable. Nous nous assurons que vos commandes arrivent à temps, directement à votre porte."},
      {id:2, titre:"Grains de Café Frais", icon:"fa-coffee", image:"service-2.jpg", text:"Nous sélectionnons et torréfions les meilleurs grains de café pour garantir une fraîcheur et une saveur incomparables dans chaque tasse."},
      {id:3, titre:"", icon:"", image:"", text:""},
      {id:4, titre:"", icon:"", image:"", text:""}
    ]
  }

}
