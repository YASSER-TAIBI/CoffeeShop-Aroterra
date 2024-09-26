import { Component, Input, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NgIf} from "@angular/common";
import { register} from "swiper/element/swiper-element";

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestimonialComponent {

  @Input() showPageHeader: boolean = true;


}
