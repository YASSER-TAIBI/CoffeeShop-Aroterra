import {Component, inject} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import { Notification } from '../../models/notification';
import {Observable} from "rxjs";
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    AsyncPipe,
    NgForOf,
    DatePipe
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../assets/css/admin-styles.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  notifications$: Observable<Notification[]>;

  constructor() {
    this.notifications$ = this.notificationService.getNotification();
  }

  unreadCount(notifications: Notification[]): number {
    return notifications.filter(n => !n.isRead).length;
  }

  async onNotifClick(notification: Notification): Promise<void> {
    if (notification.titre){
      // Mettre la notification à lue (isRead = true)
      notification.isRead = true;
      // Appeler la méthode de mise à jour pour sauvegarder dans Firestore
      await this.notificationService.updateNotification(notification).then(() => {
        console.log('Notification mise à jour avec succès');
      }).catch(error => {
        console.error('Erreur lors de la mise à jour de la notification:', error);
      });
    if (notification.titre === 'Reservation') {
       window.location.href = 'consulter-reservations';
    } else if (notification.titre === 'Testimonial') {
       window.location.href = 'testimonial-client';
    }
    }
  }

  convertToDate(timestamp: any): Date {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate();
    }
    return timestamp; // Retourner l'objet inchangé s'il est déjà un Date
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
