import { Routes } from '@angular/router';
import { AuthGuard, LoginGuard } from './pages/root/service/auth.guard';

export const routes: Routes = [
  {
    path: 'main',
    canActivate: [AuthGuard()],
    loadChildren: () =>
      import('./pages/main/main.routes').then((m) => m.routes),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/main/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'login',
    canActivate: [LoginGuard()],
    loadComponent: () =>
      import('./pages/root/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'signup',
    canActivate: [LoginGuard()],
    loadComponent: () =>
      import('./pages/root/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
];
