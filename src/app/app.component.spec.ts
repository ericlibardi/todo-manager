import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoStore } from './pages/main/todo-list/store/todos.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore<TodoStore>({
          initialState: { loading: false, todos: [] },
        }),
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
