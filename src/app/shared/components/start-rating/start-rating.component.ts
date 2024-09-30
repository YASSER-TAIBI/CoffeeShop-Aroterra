import {Component, Input} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-start-rating',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './start-rating.component.html',
  styleUrl: './start-rating.component.css'
})
export class StartRatingComponent {
faStar = faStar;

  @Input() rating: number = 0;
  @Input() readonly: boolean = false;

  setRating(value: number) {
    if (this.readonly) return;
    this.rating = value;
  }
}
