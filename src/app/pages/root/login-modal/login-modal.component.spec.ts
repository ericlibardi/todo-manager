import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModalComponent } from './login-modal.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoStore } from '../../main/todo-list/store/todos.reducer';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginModalComponent, NoopAnimationsModule],
      providers: [
        provideMockStore<TodoStore>({
          initialState: { loading: false, todos: [] },
        }),
        provideHttpClient(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
