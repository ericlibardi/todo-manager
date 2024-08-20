import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoFormComponent } from './add-todo-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoStore } from '../store/todos.reducer';
import { provideHttpClient } from '@angular/common/http';

describe('AddTodoFormComponent', () => {
  let component: AddTodoFormComponent;
  let fixture: ComponentFixture<AddTodoFormComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoFormComponent],
      providers: [
        provideHttpClient(),
        provideMockStore<TodoStore>({
          initialState: { loading: false, todos: [] },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
