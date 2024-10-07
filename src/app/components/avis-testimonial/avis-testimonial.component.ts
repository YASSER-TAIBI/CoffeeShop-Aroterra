import {Component, inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Notification} from "../../models/notification";
import {MenuEtat} from "../../models/menu";
import {Testimonial, TestimonialCivilite} from "../../models/testimonial";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {StartRatingComponent} from "../../shared/components/start-rating/start-rating.component";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {TestimonialService} from "../../services/testimonial.service";
import {ReservationService} from "../../services/reservation.service";
import {NotificationService} from "../../services/notification.service";


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
  styleUrls: ['./avis-testimonial.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AvisTestimonialComponent {

  @Input() showPageHeader: boolean = true;
  testimonialService = inject(TestimonialService);
  notificationService = inject(NotificationService);
  testimonialCivilite = TestimonialCivilite;

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
    appreciationForm:"Appréciation Globale",
    serviceForm:"Service",
    propreteForm:"Propreté",
    nourritureForm:"Nourriture",
    commentaireForm:"Commentaire"
  }

  formData = {
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    appreciation: 0,
    service: 0,
    proprete: 0,
    nourriture: 0,
    commentaire: '',
  };

  get averageRating() {
    const { service, proprete, nourriture } = this.formData;
    return Math.round((service + proprete + nourriture) / 3) || 0;
  }

  getClientImage() {
    if (this.formData.civilite === this.testimonialCivilite.monsieur){
      return 'https://www.bhaskaranbrown.com/wp-content/uploads/2023/07/1-2.png';
    }else{
      return 'https://www.bhaskaranbrown.com/wp-content/uploads/2023/07/2-2.png';
    }
  }

  private getTestimonialCiviliteEnum(value: string): TestimonialCivilite | undefined {
    return Object.values(TestimonialCivilite).find(item => item === value);
  }

  async onSubmit(): Promise<void> {

    // Handle form submission, e.g., send the data to your backend
    console.log('Form Data before:', this.formData);

    if (this.formData.nom === '' ||this.formData.prenom === '' || this.formData.email === '' || this.formData.civilite === '' || this.formData.commentaire === '' || this.formData.service === 0 || this.formData.nourriture === 0 || this.formData.proprete === 0 ) {
      alert('Remplir tous les champs de saisie !');
      return;
    }

   if (window.confirm('Voulez-vous continuer la réservation de votre table !')) {

      const testimonial: Testimonial = {
        nom: this.formData.nom || '',
        prenom: this.formData.prenom || '',
        email: this.formData.email || '',
        civilite: this.formData.civilite || '',
        dateCreation: new Date() || '',
        commentaire: this.formData.commentaire || '',
        photo: this.getClientImage() || '',
        service: this.formData.service  || 0,
        proprete: this.formData.proprete  || 0,
        nourriture: this.formData.nourriture  || 0,
        appreciation: this.averageRating  || 0,
      };

      console.log('Form Data after:', testimonial);
      this.resetForm();
       await  this.testimonialService.addTestimonial(testimonial).then(async (testId) => {
        this.resetForm();
        alert('Votre avis est enregistré avec succès!');

        // Extraire l'ID du document de la testimonial
        const testimonialId = testId.id;

        // Ajouter une notification en cas de succès
        const notification: Notification = {
          dateCreation: new Date(),
          description: `Nouvel avis du client ${testimonial.nom} ${testimonial.prenom}.`,
          icon: 'fa-star',
          color: '#1cc88a !important',
          isRead: false,
          titre: 'Testimonial',
          testimonialId: testimonialId
        };
        await this.notificationService.addNotification(notification);
      }).catch(error => {
        console.error(error);
        alert('Erreur lors de la mise à jour du profil.');
      });
    }
  }

  resetForm(){
    this.formData = {
      civilite:'',
      nom: '',
      prenom: '',
      email: '',
      appreciation: 0,
      service: 0,
      proprete: 0,
      nourriture: 0,
      commentaire: '',
    }
  }

  protected readonly faStar = faStar;
}
