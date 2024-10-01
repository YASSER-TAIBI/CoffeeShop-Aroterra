import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Notification} from "../../models/notification";
import {MenuEtat} from "../../models/menu";
import {TestimonialCivilite} from "../../models/testimonial";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {StartRatingComponent} from "../../shared/components/start-rating/start-rating.component";


@Component({
  selector: 'app-avis-testimonial',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StartRatingComponent
  ],
  templateUrl: './avis-testimonial.component.html',
  styleUrls: ['./avis-testimonial.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class AvisTestimonialComponent implements OnInit {
  faCoffee = faCoffee;


  @Input() showPageHeader: boolean = true;
  testimonialCivilite = TestimonialCivilite;


  ngOnInit(): void {}

  get testimonialCivilites(): string[] {
    return Object.values(this.testimonialCivilite);
  }

  avis = {
    title:"Avis Clients",
    urlPrevious:"Accueil",
    urlCurrent:"Avis Clients",
    avisTitre: "PARTAGEZ VOTRE EXPÉRIENCE !",
    avisTexte: "Votre avis compte ! Aidez-nous à améliorer notre service en partageant votre expérience.",

    civiliteForm: "Civilité",
    nomForm:"Nom",
    prenomForm:"Prénom",
    emailForm:"Email",
    appreciationForm:"Appréciation :",
    serviceForm:"Service :",
    propreteForm:"Propreté :",
    nourritureForm:"Nourriture :",
    commentaireForm:"Commentaire"
  }
  formData = {
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    appreciation: '',
    service: '',
    proprete: '',
    nourriture: '',
    commentaire: '',
  };

  private getTestimonialCiviliteEnum(value: string): TestimonialCivilite | undefined {
    return Object.values(TestimonialCivilite).find(item => item === value);
  }

  async onSubmit(): Promise<void> {
  /*  console.log('Form Submitted', this.formData);

    if (this.formData.nom === '' ||this.formData.prenom === '' || this.formData.email === '' || this.formData.tel === '' || !this.formData.date || this.formData.people === '' || this.formData.designation === '' ) {
      alert('Remplir tous les champs de saisie !');
      return;
    }

    if (window.confirm('Voulez-vous continuer la réservation de votre table !')) {
      const reservation: Reservation = {
        nom: this.formData.nom || '',
        prenom: this.formData.prenom || '',
        email: this.formData.email || '',
        tel: this.formData.tel || '',
        date: this.formData.date,
        time: this.formData.time,
        people: this.formData.people || '',
        designation: this.formData.designation || '',
        adminEmail:'',
        etat: "En Cours" || '',
      };

      console.log('Form Submitted', reservation);
      await  this.reservationService.addReservation(reservation).then(async (resId) => {
        this.resetForm();
        alert('Réservation effectuée avec succès!');

        // Extraire l'ID du document de la réservation
        const reservationId = resId.id;

        // Ajouter une notification en cas de succès
        const notification: Notification = {
          dateCreation: new Date(),
          description: `Nouvelle réservation par ${reservation.nom} ${reservation.prenom} pour ${reservation.people} personnes.`,
          icon: 'fa-calendar-alt',
          color: '#da9f5b !important',
          isRead: false,
          titre: 'Reservation',
          reservationId: reservationId
        };
        await this.notificationService.addNotification(notification);
      }).catch(error => {
        console.error(error);
        alert('Erreur lors de la mise à jour du profil.');
      });
    } */
  }

  resetForm(){
    this.formData = {
      civilite:'',
      nom: '',
      prenom: '',
      email: '',
      appreciation: '',
      service: '',
      proprete: '',
      nourriture: '',
      commentaire: '',
    }
  }
}
