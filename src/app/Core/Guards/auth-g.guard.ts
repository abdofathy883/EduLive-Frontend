import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

export const authGGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login if not logged in
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  
  return true;
};
