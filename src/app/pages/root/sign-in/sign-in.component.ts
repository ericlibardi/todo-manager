import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MyErrorStateMatcher } from '../../../shared/errorMatch.util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  formSignIn: FormGroup;

  matcher = new MyErrorStateMatcher();

  private _snackBar = inject(MatSnackBar);

  get email() {
    return this.formSignIn.get('email');
  }

  get password() {
    return this.formSignIn.get('password');
  }

  get confirmPassword() {
    return this.formSignIn.get('confirmPassword');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formSignIn = fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@$!%*?&]).{8,12}'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  onSubmit() {
    if (!this.formSignIn.valid) return;

    const { email, password } = this.formSignIn.value;

    this.authService.signup(email, password).subscribe({
      next: (res) => this.router.navigate(['main']),
      error: (err) => {
        this._snackBar.open(err, 'login', { duration: 5000 });
      },
    });
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
