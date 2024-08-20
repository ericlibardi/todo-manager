import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiActions, TodoApiActions } from './todos.actions';
import { map, switchMap, pipe, catchError, EMPTY, exhaustMap } from 'rxjs';
import { TodosService } from '../service/todos.service';

@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loadTodos),
      exhaustMap(() =>
        this.todosService.fetchUserTodos().pipe(
          map((todos) => TodoApiActions.retrievedTodoList({ todos })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private todosService: TodosService) {}
}
