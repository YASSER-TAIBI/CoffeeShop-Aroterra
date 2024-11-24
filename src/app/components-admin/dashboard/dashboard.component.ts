import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener, inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {NgForOf, NgOptimizedImage, NgStyle} from "@angular/common";
import {UserProfile} from "../../models/userProfile";
import {UserProfileService} from "../../services/user-profile.service";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";
import {NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgStyle,
    NgxSpinnerComponent,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../assets/css/admin-styles.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit, AfterViewInit{
  @ViewChild('card') cardElement!: ElementRef;
  profiles: UserProfile[] = [];
  faSize: string | undefined;
  heightImag: string | undefined;
  widthImag: string | undefined;

  authService = inject(AuthService);
  userProfileService = inject(UserProfileService);
  private spinner = inject(NgxSpinnerService);



  ngOnInit(): void {
    this.spinner.show();
    this.loadProfiles();
    this.spinner.hide();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getCardSize();
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.getCardSize(); // Réexécuter la méthode lors d'un redimensionnement
  }

  private getCardSize() {
    // Vérifier si l'élément est défini
    if (this.cardElement) {
      const cardRect = this.cardElement.nativeElement.getBoundingClientRect();
      // console.log('Card Width:', cardRect.width);
      if (cardRect.width <= 290) {
        this.faSize = "fa-1x";
        this.widthImag = "40px"
        this.heightImag = "40px"
      }else {
        this.faSize = "fa-2x";
        this.widthImag = "70px"
        this.heightImag = "70px"
      }
    }
  }

  loadProfiles(): void {
    this.userProfileService.getUserProfile().subscribe((data) => {

      const currentUser = this.authService.getCurrentUser()?.username;

      // Trier les profils en mettant celui correspondant à l'utilisateur actuel en premier
      this.profiles = data.sort((a, b) => {
        const isCurrentUserA = currentUser === `${a.prenom} ${a.nom}` ? 1 : 0;
        const isCurrentUserB = currentUser === `${b.prenom} ${b.nom}` ? 1 : 0;
        return isCurrentUserB - isCurrentUserA;
      });
    });
  }
}
