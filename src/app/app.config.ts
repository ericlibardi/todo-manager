import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './pages/root/service/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { todosReducer } from './pages/main/todo-list/store/todos.reducer';
import { errorInterceptor } from './pages/root/service/error.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { TodosEffects } from './pages/main/todo-list/store/todos.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom([BrowserAnimationsModule, HttpClientModule]),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideStore({
      todo: todosReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideEffects([TodosEffects]),
  ],
};
