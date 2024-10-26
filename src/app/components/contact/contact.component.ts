import {Component, inject, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {JsonPipe, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForm} from '@angular/forms';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import emailjs from '@emailjs/browser';
import {TestimonialService} from "../../services/testimonial.service";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent {

  @Input() showPageHeader: boolean = true;
  @ViewChild('contactForm') contactForm: NgForm | undefined;

  fb = inject(FormBuilder)

  contact = {
    title: "Nous Contacter",
    urlPrevious: "Accueil",
    urlCurrent: "Contact",
    description: "N'hésitez pas à nous contacter",
    titleAdresse: "Adresse",
    detailAdresse: "131 Rue Antoine Charial, 69003 Lyon",
    titleTel: "Téléphone",
    detailTel: "+33 768 13 20 16",
    titleEmail: "Email",
    detailEmail: "aroterra.lyon@gmail.com",
    nomForm: "Nom",
    emailForm: "Email",
    subjectForm: "Sujet",
    messageForm: "Message",
  }
  form: FormGroup = this.fb.group({
    name: '',
    to_name: '',
    email: '',
    subject: '',
    message: '',
  });

  async onSubmit() {
    // Check if the form is valid
    if (this.contactForm?.valid) {
      console.log('Form Submitted', this.form);

      try {
        emailjs.init('UZTVpMLGYAIAzFTAu');

        const response = await emailjs.send("service_k3yo8je", "template_9ojbu4o", {
          to_name: 'Aroterra',
          from_name: this.form.value.name,
          from_email: this.form.value.email,
          subject: this.form.value.subject,
          message: this.form.value.message,
        });

        if (response.status === 200) {
          alert('Message envoyé avec succès !');
        } else {
          alert('Échec de l’envoi du message, veuillez réessayer.');
        }

      } catch (error) {
        console.error('Erreur lors de l’envoi du message:', error);
        alert('Une erreur est survenue lors de l’envoi du message. Veuillez réessayer.');
      }

    } else {
      alert('Veuillez remplir tous les champs obligatoires avant de soumettre le formulaire.');
    }
  }


}
