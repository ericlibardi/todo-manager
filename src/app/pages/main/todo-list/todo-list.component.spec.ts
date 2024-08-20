import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoStore } from './store/todos.reducer';
import { provideHttpClient } from '@angular/common/http';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        provideMockStore<TodoStore>({
          initialState: { loading: false, todos: [] },
        }),
        provideHttpClient()
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
