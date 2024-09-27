import {Component, Input, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA, OnInit, HostListener} from '@angular/core';
import {NgIf} from "@angular/common";
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
  schemas:  [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialComponent implements OnInit {

  @Input() showPageHeader: boolean = true;
  isMobile: boolean = false;
  slidesPerView: number = 3;  // Default for PC

  ngOnInit(): void {
    this.checkScreenSize();
  }

  // Listen to window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  // Function to check screen size and update Swiper configuration
  private checkScreenSize(): void {
    if (window.innerWidth <= 769) {  // Mobile screen size
      this.isMobile = true;
      this.slidesPerView = 1;
    } else {  // PC screen size
      this.isMobile = false;
      this.slidesPerView = 3;
    }
  }
}
