import {Component, Input, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA, OnInit, HostListener, inject} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import { register } from 'swiper/element/bundle';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {Testimonial} from "../../models/testimonial";
import {TestimonialService} from "../../services/testimonial.service";
import {StartRatingComponent} from "../../shared/components/start-rating/start-rating.component";

register();
@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [
    NgIf,
    NavbarComponent,
    FooterComponent,
    NgClass,
    NgForOf,
    StartRatingComponent
  ],
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialComponent implements OnInit {

  @Input() showPageHeader: boolean = true;
  isMobile: boolean = false;
  slidesPerView: number = 3;
  testimonials: Testimonial[] = [];

  testimonialService = inject(TestimonialService);

  ngOnInit(): void {
    this.checkScreenSize();
    this.fetchTestimonials();
  }

  fetchTestimonials() {
    this.testimonialService.getTestimonial().subscribe((data: Testimonial[]) => {
      this.testimonials = data;
    });
  }

  // Listen to window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  // Function to check screen size and update Swiper configuration
  private checkScreenSize(): void {
    if (window.innerWidth <= 769) {
      this.isMobile = true;
      this.slidesPerView = 1;
    } else {
      this.isMobile = false;
      this.slidesPerView = 3;
    }
  }
}
