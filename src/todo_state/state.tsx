import {TodoModel} from '../todo_object/';
import {MessageGroups} from '../web_ui';

export interface State {
  todoHeap: TodoModel[];
  todoMap: Map<string, TodoModel>;
  messageGroups: MessageGroups;
  todoRefs: Map<number, TodoModel>;
}
