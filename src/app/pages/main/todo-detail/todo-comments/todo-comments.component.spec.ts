import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCommentsComponent } from './todo-comments.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoStore } from '../../todo-list/store/todos.reducer';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoCommentsComponent', () => {
  let component: TodoCommentsComponent;
  let fixture: ComponentFixture<TodoCommentsComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCommentsComponent, NoopAnimationsModule],
      providers: [
        provideMockStore<TodoStore>({
          initialState: { loading: false, todos: [] },
        }),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h3> with "Comments"', () => {
    const commentsElement: HTMLElement = fixture.nativeElement;
    const h3 = commentsElement.querySelector('h3')!;
    expect(h3.textContent).toEqual('Comments');
  });
});
