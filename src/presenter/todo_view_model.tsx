import {TodoModel} from "../todo_object"

export interface TodoViewModel extends TodoModel {
  todoRef: number;
}
