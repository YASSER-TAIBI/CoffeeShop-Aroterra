import { Routes } from '@angular/router';
//import { RoleGuard } from '../shared/role.guard';

export const FULL_ROUTES: Routes = [

  { title: "ARÔTERRA | Dashboard", path: 'dashboard', loadChildren: () => import('../components-admin/dashboard/dashboard.module').then(m => m.DashboardModule) },

]
