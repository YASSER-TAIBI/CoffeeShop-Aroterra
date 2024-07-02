import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css', '../../../assets/css/style.css', '../../../assets/css/style.min.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class TestimonialComponent {

  @Input() showPageHeader: boolean = true;
}
