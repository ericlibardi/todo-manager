import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDeleteModalComponent } from './todo-delete-modal.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoStore } from '../store/todos.reducer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';

describe('TodoDeleteModalComponent', () => {
  let component: TodoDeleteModalComponent;
  let fixture: ComponentFixture<TodoDeleteModalComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDeleteModalComponent],
      providers: [
        provideMockStore<TodoStore>({
          initialState: { loading: false, todos: [] },
        }),
        provideHttpClient(),
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            todo: {
              completed: false,
              title: 'Todo',
              userId: 'user_id',
              comments: [],
              id: 'todo_id',
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
