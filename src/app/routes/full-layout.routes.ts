import { Routes } from '@angular/router';
import {
  ConsulterReservationsModule
} from "../components-admin/reservation/consulter-reservations/consulter-reservations.module";
import {ReserverTableModule} from "../components-admin/reservation/reserver-table/reserver-table.module";
//import { RoleGuard } from '../shared/role.guard';

export const FULL_ROUTES: Routes = [

  { title: "ARÔTERRA | Dashboard", path: 'dashboard', loadChildren: () => import('../components-admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { title: "ARÔTERRA | Profile", path: 'profile', loadChildren: () => import('../components-admin/profile/profile.module').then(m => m.ProfileModule) },
  { title: "ARÔTERRA | Réservation", path: 'consulter-reservations', loadChildren: () => import('../components-admin/reservation/consulter-reservations/consulter-reservations.module').then(m => m.ConsulterReservationsModule) },
  { title: "ARÔTERRA | Réservation", path: 'reserver-table', loadChildren: () => import('../components-admin/reservation/reserver-table/reserver-table.module').then(m => m.ReserverTableModule) },
  { title: "ARÔTERRA | Menu & Tarifs", path: 'add-articles', loadChildren: () => import('../components-admin/menu/add-articles/add-articles.module').then(m => m.AddArticlesModule) },
  { title: "ARÔTERRA | Menu & Tarifs", path: 'consulter-menu', loadChildren: () => import('../components-admin/menu/consulter-menu/consulter-menu.module').then(m => m.ConsulterMenuModule) }
]
