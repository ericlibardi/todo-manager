import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

export function AuthGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.user$.pipe(
      take(1),
      map((user) => {
        const isLoggedIn = !!user;
        if (isLoggedIn) {
          return true;
        } else {
          return router.createUrlTree(['/login']);
        }
      })
    );
  };
}

export function LoginGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.user$.pipe(
      take(1),
      map((user) => {
        const isLogedOut = !user;
        if (isLogedOut) {
          return true;
        } else {
          return router.createUrlTree(['/main']);
        }
      })
    );
  };
}

