import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  return authService.user$.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        return next(req);
      }

      let params = req.params;
      params = params.append('auth', user.token);

      const modifiedReq = req.clone({
        params,
      });

      return next(modifiedReq);
    })
  );
};
