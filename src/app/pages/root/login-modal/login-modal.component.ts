import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../service/auth.service';
import { User } from '../models/user.model';

interface LoginModalData {
  user: User;
}

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  readonly dialogRef = inject(MatDialogRef<LoginModalComponent>);
  readonly data = inject<LoginModalData>(MAT_DIALOG_DATA);

  constructor(private authService: AuthService) {}

  onLogin(form: NgForm) {
    if (!form.valid) return;

    this.authService
      .login(this.data.user.email, form.value['password'])
      .subscribe({
        next: (res) => {
          this.dialogRef.close();
        },
      });
  }

  onLogout() {
    this.authService.logout();
    this.dialogRef.close();
  }
}
