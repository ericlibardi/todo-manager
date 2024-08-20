import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MyErrorStateMatcher } from '../../../shared/errorMatch.util';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formLogin: FormGroup;

  matcher = new MyErrorStateMatcher();

  private _snackBar = inject(MatSnackBar);

  get email() {
    return this.formLogin.get('email');
  }

  get password() {
    return this.formLogin.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formLogin = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.formLogin.valid) return;

    const { email, password } = this.formLogin.value;

    this.authService.login(email, password).subscribe({
      next: (res) => this.router.navigate(['main']),
      error: (err) => {
        this._snackBar.open(err, 'login', { duration: 5000 });
      },
    });
  }
}
