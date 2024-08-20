import { Injectable } from '@angular/core';
import { HttpBase } from '../../../shared/httpbase';
import { Comment } from './model/comment.model';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { TodoDetailsApiActions } from '../todo-list/store/todos.actions';

@Injectable({ providedIn: 'root' })
export class TodoDetailService extends HttpBase {
  constructor(private store: Store) {
    super();
  }

  postTodoComment(todoId: string, comment: Comment) {
    return this.httpClient
      .post<any>(`${this.baseUrl}/posts/${todoId}/comments.json`, comment)
      .pipe(
        tap((res) => {
          comment.id = res.name;

          this.store.dispatch(
            TodoDetailsApiActions.addedComment({ todoId, comment })
          );
        })
      );
  }

  deleteTodoComment(todoId: string, commentId: string) {
    return this.httpClient
      .delete<any[]>(
        `${this.baseUrl}/posts/${todoId}/comments/${commentId}.json`
      )
      .pipe(
        tap((res) => {
          this.store.dispatch(
            TodoDetailsApiActions.deletedComment({ todoId, commentId })
          );
        })
      );
  }
}
