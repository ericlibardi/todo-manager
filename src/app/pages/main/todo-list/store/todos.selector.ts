import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoStore } from './todos.reducer';

export const selectTodos = createFeatureSelector<TodoStore>('todo');

export const selectTodosCollection = createSelector(
  selectTodos,
  (todoState) => {
    return todoState.todos;
  }
);

export const todosIsLoading = createSelector(selectTodos, (todoState) => {
  return todoState.loading;
});
