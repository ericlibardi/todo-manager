import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TodosService } from '../service/todos.service';
import { Todo } from '../model/todo.model';
import { AuthService } from '../../../root/service/auth.service';

@Component({
  selector: 'app-add-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.scss',
})
export class AddTodoFormComponent {
  @ViewChild('addTodoForm') form!: NgForm;

  message: string | null = null;
  private messageTimeout: any = null;

  constructor(
    private todosService: TodosService,
    private authService: AuthService
  ) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      const titleControl = form.controls['title'];

      switch (true) {
        case titleControl.hasError('required'):
          this.message = 'Text is required for adding a To Do';
          break;

        case titleControl.hasError('maxlength'):
          this.message = 'Text is limited to 250 characters';
          break;

        default:
          this.message = 'Error to create your To Do';
          break;
      }

      if (this.messageTimeout) {
        clearTimeout(this.messageTimeout);
        this.messageTimeout = null;
      }

      this.messageTimeout = setTimeout(() => {
        this.message = null;
      }, 4000);

      return;
    }

    const formValues = form.value;

    const userDetails = this.authService.userDetails;
    if (!userDetails) return;

    const newTodo: Todo = {
      userId: userDetails.id,
      title: formValues.title,
      completed: false,
    };

    this.todosService.postTodo(newTodo);

    this.form.resetForm();
  }

  resetForm(event: any) {
    event.stopPropagation();
    this.form.resetForm();
  }
}
