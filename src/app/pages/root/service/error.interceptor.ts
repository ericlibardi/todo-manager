import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const matDialog: MatDialog = inject(MatDialog);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.statusText) {
        case 'Unauthorized':
          matDialog.open(LoginModalComponent, {
            data: {user: authService.userDetails},
            width: '500px',
          });

          break;

        default:
          break;
      }

      throw err;
    })
  );

  //   return authService.user$.pipe(
  //     take(1),
  //     exhaustMap((user) => {
  //       if (!user) {
  //         return next(req);
  //       }

  //       let params = req.params;
  //       params = params.append('auth', user.token);

  //       const modifiedReq = req.clone({
  //         params,
  //       });

  //       return next(modifiedReq);
  //     })
  //   );
};
