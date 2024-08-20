import { Injectable } from '@angular/core';
import { map, switchMap, take, tap, throwIfEmpty } from 'rxjs';
import { Todo } from '../model/todo.model';
import { HttpBase } from '../../../../shared/httpbase';
import { AuthService } from '../../../root/service/auth.service';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { TodoApiActions } from '../store/todos.actions';

@Injectable({
  providedIn: 'root',
})
export class TodosService extends HttpBase {
  constructor(private authService: AuthService, private store: Store) {
    super();
  }

  fetchUserTodos() {
    let params = new HttpParams();
    params = params.append('orderBy', '"userId"');

    return this.authService.user$
      .pipe(
        take(1),
        throwIfEmpty(),
        switchMap((user) => {
          params = params.append('equalTo', `"${user!.id}"`);

          return this.httpClient.get<Todo[]>(`${this.baseUrl}/posts.json`, {
            params,
          });
        })
      )
      .pipe(map((todos) => this.mapTodo(todos)));
  }

  postTodo(todo: Todo) {
    this.httpClient
      .post<{ name: string }>(`${this.baseUrl}/posts.json`, todo)
      .subscribe({
        next: (res) => {
          const newTodo: Todo = {
            ...todo,
            id: res.name,
          };

          this.store.dispatch(TodoApiActions.addedTodo({ todo: newTodo }));
        },
      });
  }

  putUpdateTodo(todo: Todo) {
    return this.httpClient
      .put<Todo>(`${this.baseUrl}/posts/${todo.id}.json`, todo)
      .pipe(
        tap((updatedTodo) => {
          this.store.dispatch(
            TodoApiActions.updatedTodo({ todo: updatedTodo })
          );
        })
      );
  }

  deleteTodo(todoId: string) {
    return this.httpClient.delete(`${this.baseUrl}/posts/${todoId}.json`).pipe(
      tap((res) => {
        this.store.dispatch(TodoApiActions.deletedTodo({ todoId }));
      })
    );
  }

  private mapTodo(todos: Todo[]): Todo[] {
    return Object.keys(todos).map((key: any) => {
      const mappedTodo = { ...todos[key] };

      if (mappedTodo.comments) {
        const mappedComments = Object.keys(mappedTodo.comments).map(
          (key: any) => ({ ...mappedTodo!.comments![key], id: key })
        );

        mappedTodo.comments = mappedComments;
      }

      return mappedTodo;
    });
  }
}
