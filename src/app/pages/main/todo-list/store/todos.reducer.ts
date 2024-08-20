import { createReducer, on } from '@ngrx/store';

import {
  AuthApiActions,
  TodoApiActions,
  TodoDetailsApiActions,
} from './todos.actions';
import { Todo } from '../model/todo.model';

export interface TodoStore {
  todos: Todo[];
  loading: boolean;
}

export const initialState: TodoStore = {
  todos: [],
  loading: false,
};

export const todosReducer = createReducer(
  initialState,
  on(AuthApiActions.loadTodos, (_state) => {
    return { ..._state, loading: true };
  }),
  on(TodoApiActions.retrievedTodoList, (_state, todoLoad) => {
    return { todos: todoLoad.todos, loading: false };
  }),
  on(TodoApiActions.addedTodo, (_state, todoLoad) => {
    const newList = [..._state.todos, todoLoad.todo];

    return { todos: newList, loading: false };
  }),
  on(TodoApiActions.updatedTodo, (_state, todoLoad) => {
    const newList = [..._state.todos];

    let todoFound = newList.findIndex((todo) => todo.id === todoLoad.todo.id);
    newList[todoFound] = todoLoad.todo;

    return { todos: newList, loading: false };
  }),
  on(TodoApiActions.deletedTodo, (_state, todoLoad) => {
    const newList = [..._state.todos];

    const updatedList = newList.filter((todo) => todo.id !== todoLoad.todoId);

    return { todos: updatedList, loading: false };
  }),
  on(TodoDetailsApiActions.addedComment, (_state, todoLoad) => {
    const newList = [..._state.todos];
    let todoFound = newList.findIndex((todo) => todo.id === todoLoad.todoId);

    const currComments = newList[todoFound].comments
      ? newList[todoFound].comments
      : [];

    newList[todoFound] = {
      ...newList[todoFound],
      comments: [...currComments!, todoLoad.comment],
    };

    return { todos: newList, loading: false };
  }),
  on(TodoDetailsApiActions.deletedComment, (_state, todoLoad) => {
    const newList = [..._state.todos];
    let todoFound = newList.findIndex((todo) => todo.id === todoLoad.todoId);

    const updatedComments = newList[todoFound].comments?.filter(
      (comment) => comment.id !== todoLoad.commentId
    );

    newList[todoFound] = {
      ...newList[todoFound],
      comments: updatedComments,
    };

    return { todos: newList, loading: false };
  })
);
