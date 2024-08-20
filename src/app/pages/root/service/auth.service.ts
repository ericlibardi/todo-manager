import { Injectable } from '@angular/core';
import { HttpBase } from '../../../shared/httpbase';

import { environment } from '../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../main/todo-list/store/todos.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends HttpBase {
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  get userDetails() {
    return this.user.value;
  }

  constructor(private router: Router, private store: Store) {
    super();
  }

  signup(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        this.baseAuthUrl + 'signUp?key=' + environment.firebaseAPIKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handlerError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        this.baseAuthUrl +
          'signInWithPassword?key=' +
          environment.firebaseAPIKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handlerError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  autoLogin() {
    const userStorage = localStorage.getItem('userData');
    if (!userStorage) return;

    const userData: {
      email: string;
      id: string;
      _token: string;
    } = JSON.parse(userStorage);

    const loadedUser = new User(userData.email, userData.id, userData._token);

    this.user.next(loadedUser);
    this.store.dispatch(AuthApiActions.loadTodos());
  }

  private handleAuthentication(email: string, userId: string, token: string) {
    const user = new User(email, userId, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));

    this.store.dispatch(AuthApiActions.loadTodos());
  }

  private handlerError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkown error occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Email or password incorrect.';
        break;
    }

    return throwError(errorMessage);
  }
}
