import { Component, Input } from '@angular/core';
import {NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgIf,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  @Input() showPageHeader: boolean = true;

  about = {
    title:"À propos de nous",
    urlPrevious:"Accueil",
    urlCurrent:"À propos",
    description: "Servir Depuis 1950",
    titleDR:"Notre Histoire",
    descriptionDR:"Depuis des décennies, nous nous engageons à offrir à nos clients des moments de plaisir et de détente inoubliables.",
    texteDR:"Depuis nos débuts, notre passion pour le café nous pousse à rechercher les meilleures plantations et à perfectionner nos méthodes de torréfaction. Chaque tasse que nous servons est le fruit de notre engagement envers la qualité et l'authenticité. Nous croyons que le café est plus qu'une simple boisson, c'est une expérience, un moment de partage et de découverte. Venez découvrir notre histoire et laissez-vous séduire par nos arômes uniques et nos saveurs incomparables.",
    titleGC:"Notre Vision",
    texteGC:"Notre vision est de créer un espace où chaque visiteur peut se sentir chez lui, déguster des produits de qualité exceptionnelle, et vivre une expérience sensorielle unique. Nous nous efforçons de promouvoir la durabilité et l'authenticité dans chaque tasse de café que nous servons. Rejoignez-nous dans cette aventure passionnante et découvrez la différence que notre engagement peut faire dans chaque gorgée.",
    checkTexte01: "Offrir une qualité exceptionnelle",
    checkTexte02: "Promouvoir la durabilité",
    checkTexte03: "Créer une expérience unique",
    btn: "En savoir plus",
    icon: "fa-check"
  }

}
