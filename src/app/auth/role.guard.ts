import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const auth = inject(AuthService)

    const roles: string[] = route.data['roles'];

    if (!auth.isHasRoles(roles)) {
      localStorage.removeItem('currentUser');
      router.navigate(['login']);
      return false;
    }
    return true;

}
