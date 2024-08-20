import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailComponent } from './todo-detail.component';
import { provideRouter } from '@angular/router';
import { TodosService } from '../todo-list/service/todos.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoStore } from '../todo-list/store/todos.reducer';
import { provideHttpClient } from '@angular/common/http';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDetailComponent],
      providers: [
        provideRouter([]),
        provideMockStore<TodoStore>({
          initialState: { loading: false, todos: [] },
        }),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixture.debugElement.injector.get(TodosService);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
