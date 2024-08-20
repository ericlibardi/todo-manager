import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { Todo } from '../../todo-list/model/todo.model';
import { TodoDetailService } from '../todo-detail.service';
import { Comment } from '../model/comment.model';

@Component({
  selector: 'app-todo-comments',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './todo-comments.component.html',
  styleUrl: './todo-comments.component.scss',
})
export class TodoCommentsComponent {
  @Input() todo!: Todo | undefined;

  constructor(private todoDetailService: TodoDetailService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const newComment: Comment = {
      title: form.value['title'],
    };

    this.todoDetailService
      .postTodoComment(this.todo!.id!, newComment)
      .subscribe({
        next: (res) => {
          form.resetForm();
        },
      });
  }

  onDeleteComment(comment: Comment) {
    this.todoDetailService
      .deleteTodoComment(this.todo?.id!, comment.id!)
      .subscribe();
  }
}
