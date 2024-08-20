import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailHeaderComponent } from './todo-detail-header.component';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('TodoDetailHeaderComponent', () => {
  let component: TodoDetailHeaderComponent;
  let fixture: ComponentFixture<TodoDetailHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDetailHeaderComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
