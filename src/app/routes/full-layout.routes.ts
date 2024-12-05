import { Routes } from '@angular/router';
import {authGuard} from "../auth/auth.guard";
import {roleGuard} from "../auth/role.guard";

export const FULL_ROUTES: Routes = [
  { title: "ARÔTERRA | Dashboard", path: 'dashboard', loadChildren: () => import('../components-admin/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard]  },
  { title: "ARÔTERRA | Profile", path: 'profile', loadChildren: () => import('../components-admin/profile/profile.module').then(m => m.ProfileModule) },
  { title: "ARÔTERRA | Réservation", path: 'consulter-reservations', loadChildren: () => import('../components-admin/reservation/consulter-reservations/consulter-reservations.module').then(m => m.ConsulterReservationsModule) },
  { title: "ARÔTERRA | Réservation", path: 'reserver-table', loadChildren: () => import('../components-admin/reservation/reserver-table/reserver-table.module').then(m => m.ReserverTableModule)},
  { title: "ARÔTERRA | Menu & Tarifs", path: 'add-articles', loadChildren: () => import('../components-admin/menu/add-articles/add-articles.module').then(m => m.AddArticlesModule) },
  { title: "ARÔTERRA | Réservation", path: 'calendrier-reservations', loadChildren: () => import('../components-admin/reservation/calendrier-reservations/calendrier-reservations.module').then(m => m.CalendrierReservationsModule) },
  { title: "ARÔTERRA | Testimonial", path: 'testimonial-client', loadChildren: () => import('../components-admin/testimonial-client/testimonial-client.module').then(m => m.TestimonialClientModule), canActivate:[roleGuard], data: { roles : ['Administrateur']} },
  { title: "ARÔTERRA | Notification", path: 'notification', loadChildren: () => import('../components-admin/notification/notification.module').then(m => m.NotificationModule), canActivate:[roleGuard], data: { roles : ['Administrateur']} },
  { title: "ARÔTERRA | Menu & Tarifs", path: 'hot-drinks', loadChildren: () => import('../components-admin/menu/hot-drinks/hot-drinks.module').then(m => m.HotDrinksModule) },
  { title: "ARÔTERRA | Menu & Tarifs", path: 'breakfast', loadChildren: () => import('../components-admin/menu/breakfast/breakfast.module').then(m => m.BreakfastModule) },
  { title: "ARÔTERRA | Menu & Tarifs", path: 'cold-drinks', loadChildren: () => import('../components-admin/menu/cold-drinks/cold-drinks.module').then(m => m.ColdDrinksModule) },
  { title: "ARÔTERRA | Statistique", path: 'chart', loadChildren: () => import('../components-admin/chart/chart.module').then(m => m.ChartModule) },
  { title: "ARÔTERRA | Événement", path: 'add-event', loadChildren: () => import('../components-admin/event/add-event/add-event.module').then(m => m.AddEventModule) },
]
