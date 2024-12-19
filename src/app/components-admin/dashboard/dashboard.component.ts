import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener, inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {DatePipe, LowerCasePipe, NgClass, NgForOf, NgOptimizedImage, NgStyle} from "@angular/common";
import {UserProfile} from "../../models/userProfile";
import {UserProfileService} from "../../services/user-profile.service";
import {AuthService} from "../../auth/auth.service";
import {NgxSpinnerComponent, NgxSpinnerService} from "ngx-spinner";
import { Chart, registerables } from "chart.js";
import {ChartService} from "../../services/chart.service";
import {EventService} from "../../services/event.service";
import {HolidayTranslations} from "../../shared/translations/holiday-translations";
import {Event} from "../../models/event";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        NgOptimizedImage,
        NgForOf,
        NgStyle,
        NgxSpinnerComponent,
        NgClass,
        LowerCasePipe,
        DatePipe,
        FormsModule,
        NgxPaginationModule,
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

  doughnutChart: any;
  barChart: any;

  reservationsCount = { valider: 0, enCours: 0, nonValider: 0 };

  franceHolidays: Event[] = [];
  marocHolidays: Event[] = [];
  eventCustomer: Event[] = [];
  allHolidays: Event[] = []; // Pour combiner les événements

  authService = inject(AuthService);
  userProfileService = inject(UserProfileService);
  chartService = inject(ChartService);
  private spinner= inject(NgxSpinnerService);
  private eventService= inject(EventService);

  ngAfterViewInit() {
    setTimeout(() => {
      this.getCardSize();
    }, 0);
  }

  async ngOnInit() {
    document.body.style.overflow = 'hidden';

    // Event
    await this.loadTodayEvents ();

    // Chart
    this.initDoughnutChart();
    this.initBarChart();

    this.spinner.show();
    this.loadProfiles();

    setTimeout(() => {
      this.spinner.hide();
      document.body.style.overflow = '';
    }, 2000);
  }

  async loadTodayEvents(){
    try {
      const todayEvents = await this.eventService.getTodayEvent();
      this.franceHolidays = todayEvents.france;
      this.marocHolidays = todayEvents.maroc;
      this.eventCustomer = todayEvents.event;

      // Combinez tous les événements pour les afficher dans une seule liste
      this.allHolidays = [
        ...this.franceHolidays,
        ...this.marocHolidays,
        ...this.eventCustomer,
      ];

      console.log('All Holidays:', this.allHolidays);
    } catch (error) {
      console.error('Erreur lors du chargement des événements :', error);
    }
  }

  async initDoughnutChart(): Promise<void> {
    // Charger la configuration initiale
    const doughnutChartConfig = this.chartService.getChartConfig();
    // Charger les données des réservations
    this.reservationsCount = await this.chartService.loadReservationsData();
    // Mettre à jour les données du graphique
    doughnutChartConfig.data.datasets[0].data = [
      this.reservationsCount.valider,
      this.reservationsCount.enCours,
      this.reservationsCount.nonValider,
    ];
    // Créer le graphique
    this.doughnutChart = new Chart('doughnutChartId', doughnutChartConfig);
  }

  async initBarChart(): Promise<void> {
    // Charger les données des réservations mensuelles
    const monthlyData = await this.chartService.loadMonthlyReservationsData();
    // Configurer et créer le Bar Chart
    const barChartConfig = this.chartService.getBarChartConfig();
    barChartConfig.data.labels = monthlyData.labels;
    barChartConfig.data.datasets[0].data = monthlyData.valider;
    barChartConfig.data.datasets[1].data = monthlyData.enCours;
    barChartConfig.data.datasets[2].data = monthlyData.nonValider;
    // Créer le graphique
    this.barChart = new Chart('barChartId', barChartConfig);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.getCardSize();
  }

  private getCardSize() {
    // Vérifier si l'élément est défini
    if (this.cardElement) {
      const cardRect = this.cardElement.nativeElement.getBoundingClientRect();
      // console.log('Card Width:', cardRect.width);
      if (cardRect.width <= 320) {
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
