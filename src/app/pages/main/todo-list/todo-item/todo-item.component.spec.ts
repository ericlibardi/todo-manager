import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';

import { TodoStore } from '../store/todos.reducer';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
      providers: [
        provideHttpClient(),
        provideMockStore<TodoStore>({
          initialState: { loading: false, todos: [] },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;

    component.todo = {
      completed: false,
      title: 'Todo',
      userId: 'user_id',
      comments: [],
      id: 'todo_id',
    };

    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have todo', () => {
    expect(component.todo).toBeTruthy();
  });
});
