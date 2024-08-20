import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Todo } from '../model/todo.model';
import { TodosService } from '../service/todos.service';
import { TodoDeleteModalComponent } from '../todo-delete-modal/todo-delete-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [MatIconModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(
    private todosService: TodosService,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  onCheckBoxChange(event: MatCheckboxChange) {
    const updatedTodo = { ...this.todo, completed: event.checked };

    this.todosService.putUpdateTodo(updatedTodo).subscribe();
  }

  onDelete(event: MouseEvent) {
    event.stopPropagation();

    this.matDialog.open(TodoDeleteModalComponent, {
      data: { todo: this.todo },
      width: '500px',
    });
  }

  onEdit(event: MouseEvent) {
    event.stopPropagation();

    this.router.navigate(['main', this.todo.id], {
      queryParams: { editmode: true },
    });
  }
}
