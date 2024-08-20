import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

import { Todo } from '../todo-list/model/todo.model';
import { TodosService } from '../todo-list/service/todos.service';
import { TodoDetailHeaderComponent } from './todo-detail-header/todo-detail-header.component';
import { TodoCommentsComponent } from './todo-comments/todo-comments.component';
import { Store } from '@ngrx/store';
import { selectTodosCollection } from '../todo-list/store/todos.selector';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [
    CommonModule,
    TodoDetailHeaderComponent,
    MatSlideToggleModule,
    MatInputModule,
    FormsModule,
    TextFieldModule,
    TodoCommentsComponent,
  ],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent {
  @ViewChild('editFormTodo') todoEditForm!: NgForm;

  data$: Observable<{ todo: Todo | undefined; isEditMode: boolean }>;

  private todo$!: Observable<Todo | undefined>;
  private isEditMode$: Observable<boolean>;

  get title() {
    return this.todoEditForm?.controls['title'];
  }

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService,
    private store: Store,
    private router: Router
  ) {
    this.todo$ = combineLatest([
      this.store.select(selectTodosCollection),
      this.route.params,
    ]).pipe(
      map(([todos, params]) => {
        const todoId = params['id'];

        return todos!.find((todo) => todo.id === todoId);
      })
    );

    this.isEditMode$ = this.route.queryParams.pipe(
      map((query) => {
        const editMode = query['editmode'];

        return !!editMode;
      })
    );

    this.data$ = combineLatest([this.todo$, this.isEditMode$]).pipe(
      map(([todo, isEditMode]) => ({ todo, isEditMode }))
    );
  }

  onSaveTodo(todo: Todo | undefined) {
    if (!this.todoEditForm.valid || !todo) return;

    const { title, completed } = this.todoEditForm.value;

    const updatedTodo: Todo = {
      ...todo,
      title,
      completed,
    };

    this.todosService.putUpdateTodo(updatedTodo).subscribe({
      next: () => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { editmode: null },
        });
      },
    });
  }
}
