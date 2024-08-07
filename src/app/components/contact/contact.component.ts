import {Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { NgForm } from '@angular/forms';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent {

  @Input() showPageHeader: boolean = true;
  @ViewChild('contactForm') contactForm: NgForm | undefined;

  contact = {
    title:"Nous Contacter",
    urlPrevious:"Accueil",
    urlCurrent:"Contact",
    description: "N'hésitez pas à nous contacter",
    titleAdresse: "Adresse",
    detailAdresse: "131 Rue Antoine Charial, 69003 Lyon",
    titleTel: "Téléphone",
    detailTel: "+33 768 13 20 16",
    titleEmail: "Email",
    detailEmail: "yasser.taibi.19@gmail.com",
    nomForm:"Nom",
    emailForm:"Email",
    subjectForm:"Sujet",
    messageForm:"Message",
  }

  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  onSubmit(): void {
    // @ts-ignore
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.formData);
    }
  }

}
