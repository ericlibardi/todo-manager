import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TodosService } from '../service/todos.service';
import { DialogData } from '../model/dialog-data.modal';

@Component({
  selector: 'app-todo-delete-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
  ],
  templateUrl: './todo-delete-modal.component.html',
  styleUrl: './todo-delete-modal.component.scss',
})
export class TodoDeleteModalComponent {
  readonly dialogRef = inject(MatDialogRef<TodoDeleteModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  constructor(private todosService: TodosService) {}

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    const todo = this.data.todo;

    this.todosService.deleteTodo(todo.id!).subscribe({
      next: (res) => {
        this.dialogRef.close('confirm');
      },
    });
  }
}
