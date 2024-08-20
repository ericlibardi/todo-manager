import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { Todo } from './model/todo.model';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodosService } from './service/todos.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { selectTodosCollection } from './store/todos.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    AddTodoFormComponent,
    TodoItemComponent,
    MatListModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todoList$: Observable<Todo[] | null> = this.store.select(
    selectTodosCollection
  );

  constructor(private router: Router, private store: Store) {}

  onItemClick(todoId: string | undefined) {
    this.router.navigate(['main', todoId]);
  }
}
