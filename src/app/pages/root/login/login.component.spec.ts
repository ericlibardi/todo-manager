import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../service/auth.service';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatInputModule } from '@angular/material/input';
import { provideRouter, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { initialState } from '../../main/todo-list/store/todos.reducer';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        MatInputModule,
        RouterLink,
        ReactiveFormsModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState }),
        provideHttpClient(),
        provideRouter([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
