import { Routes } from '@angular/router';
//import { RoleGuard } from '../shared/role.guard';

export const FULL_ROUTES: Routes = [

  { title: "ARÔTERRA | Dashboard", path: 'dashboard', loadChildren: () => import('../components-admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { title: "ARÔTERRA | Profile", path: 'profile', loadChildren: () => import('../components-admin/profile/profile.module').then(m => m.ProfileModule) }

]
