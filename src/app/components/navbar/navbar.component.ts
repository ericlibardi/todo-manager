import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../pages/root/service/auth.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

enum MenuOption {
  LOGIN = 'Login',
  SIGNUP = 'Sign Up',
  LOGOUT = 'Logout',
}

@Component({
  selector: 'todo-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authenticated$ = this.authService.user$.pipe(map((user) => !!user));
  notAuthenticated$ = this.authService.user$.pipe(map((user) => !user));

  public get MenuOptionEnum(): typeof MenuOption {
    return MenuOption;
  }

  constructor(private router: Router, private authService: AuthService) {}

  onMenuClick(option: MenuOption) {
    switch (option) {
      case MenuOption.LOGIN:
        this.router.navigate(['/login']);
        break;

      case MenuOption.SIGNUP:
        this.router.navigate(['/signup']);
        break;

      case MenuOption.LOGOUT:
        this.authService.logout();
        break;
    }
  }
}
