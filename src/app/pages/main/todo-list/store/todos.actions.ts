import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../model/todo.model';
import { Comment } from '../../todo-detail/model/comment.model';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'Add Todo': props<{ todo: Todo }>(),
    'Update Todo': props<{ todo: Todo }>(),
    'Remove Todo': props<{ todoId: string }>(),
  },
});

export const TodoApiActions = createActionGroup({
  source: 'Todos API',
  events: {
    'Retrieved Todo List': props<{ todos: Array<Todo> }>(),
    'Added Todo': props<{ todo: Todo }>(),
    'Updated Todo': props<{todo: Todo}>(),
    'Deleted Todo': props<{ todoId: string }>(),
  },
});

export const TodoDetailsApiActions = createActionGroup({
  source: 'Todo Details API',
  events: {
    'Added Comment': props<{ todoId: string, comment: Comment }>(),
    'Deleted Comment': props<{ todoId: string, commentId: string }>(),
  },
});

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    'Load Todos': emptyProps(),
  },
});
