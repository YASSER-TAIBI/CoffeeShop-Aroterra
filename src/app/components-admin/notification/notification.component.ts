import {Component, inject, OnInit} from '@angular/core';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StartRatingComponent} from "../../shared/components/start-rating/start-rating.component";
import {Notification} from "../../models/notification";
import {AuthService} from "../../auth/auth.service";
import {NotificationService} from "../../services/notification.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgxPaginationModule,
    ReactiveFormsModule,
    StartRatingComponent,
    FormsModule,
    DatePipe
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  notificationList: Notification[] = [];

  authService = inject(AuthService);
  notificationService = inject(NotificationService);

  //Pagination
  p: number = 1;
  searchText: string = '';

  ngOnInit(): void {
    this.getNotificationList();
  }

  getNotificationList() {
    this.notificationService.getNotification().subscribe(data => {
      if (data) {
        this.notificationList = data.map(notification => ({
          id: notification.id,
          ...notification,
          dateCreation: (notification.dateCreation as any)?.toDate() || new Date()
        }));
      } else {
        console.log("aucun Notification trouvé");
      }
    });
  }

  get filteredNotifications(): Notification[] {
    return this.notificationList.filter(notification =>
      notification.titre.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleReadStatus(notification: Notification): void {
    if (window.confirm('Voulez-vous vraiment modifier cette notification ?')) {
    this.notificationService.updateNotification(notification)
      .then(() => {
        alert('Notification modifiée avec succès !');
        console.log(`Notification ${notification.id} mise à jour : isRead = ${notification.isRead}`);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la notification :', error);
      });
  }
  }

  DeleteNotification(notification: Notification) {
    if (window.confirm('Voulez-vous vraiment supprimer cette notification ?')) {
      this.notificationService.deleteNotification(notification.id!)
        .then(() => {
          alert('Notification supprimée avec succès!');
          // Supprimez la notification localement de la liste pour éviter un appel supplémentaire à Firestore
          this.notificationList = this.notificationList.filter(r => r.id !== notification.id);
        })
        .catch(error => {
          console.error('Error deleting notification: ', error);
        });
    }
  }

  trackByNotificationId(index: number, notification: Notification): string | undefined {
    return notification.id;
  }

}


