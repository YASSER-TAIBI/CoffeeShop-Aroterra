import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {

  @Input() showPageHeader: boolean = true;
}
