import { Comment } from "../../todo-detail/model/comment.model";

export interface Todo {
  userId: string;
  id?: string;
  title: string;
  completed: boolean;
  comments?: Comment[]
}
