import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoStore } from '../store/todos.reducer';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Todo } from '../model/todo.model';

describe('TodosService', () => {
  let service: TodosService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let store: MockStore;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        provideMockStore<TodoStore>({
          initialState: { loading: false, todos: [] },
        }),
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });

    service = TestBed.inject(TodosService);
    store = TestBed.inject(MockStore);

    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#add Todo should return a Todo with id', () => {
    const newTodo: Todo = {
      completed: false,
      title: 'Task',
      userId: 'user_id',
      comments: [],
    };

    const updatedTodo: Todo = {
      ...newTodo,
      id: 'todo_id',
    };

    httpClientSpy.post.and.returnValue(of(updatedTodo));

    service.postTodo(newTodo);

    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });
});
