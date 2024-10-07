import {Component, inject, OnInit} from '@angular/core';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {documentId} from "@angular/fire/firestore";
import {Testimonial} from "../../models/testimonial";
import {TestimonialService} from "../../services/testimonial.service";
import {Reservation} from "../../models/reservation";

@Component({
  selector: 'app-testimonial-client',
  standalone: true,
  imports: [
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './testimonial-client.component.html',
  styleUrls: ['./testimonial-client.component.css', '../../../assets/css/admin-styles.css']
})
export class TestimonialClientComponent implements OnInit {

  testimonialList: Testimonial[] = [];

  authService = inject(AuthService);
  testimonialService = inject(TestimonialService);

  //Pagination
  p: number = 1;

  searchText: string = '';

  ngOnInit(): void {
    this.getTestimonialList();
  }

  getTestimonialList() {
    this.testimonialService.getTestimonial().subscribe(data => {
      if (data) {
        this.testimonialList = data.map(testimonial => ({
          id: testimonial.id,
          ...testimonial
        }));
        console.log("this.testimonialList", this.testimonialList);
      } else {
        console.log("aucun Testimonial trouvé");
      }
    });
  }

  get filteredTestimonials(): Testimonial[] {
    return this.testimonialList.filter(testimonial =>
      testimonial.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      testimonial.prenom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  DeleteTestimonial(testimonial: Testimonial) {
    if (window.confirm('Voulez-vous vraiment supprimer cette avis ?')) {
      this.testimonialService.deleteTestimonial(testimonial.id!)
        .then(() => {
          alert('avis supprimée avec succès!');
          // Supprimez l'avis localement de la liste pour éviter un appel supplémentaire à Firestore
          this.testimonialList = this.testimonialList.filter(r => r.id !== testimonial.id);
        })
        .catch(error => {
          console.error('Error deleting avis: ', error);
        });
    }
  }

  protected readonly documentId = documentId;
}
