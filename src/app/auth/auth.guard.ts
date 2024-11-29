import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) {
    router.navigate(['/login']);
    alert('Vous devez vous connecter d\'abord.');
    return false;
  }
  return true;
};
