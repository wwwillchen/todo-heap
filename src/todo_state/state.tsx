import {TodoModel, TodoHeap} from '../todo_object/';
import {MessageGroups} from '../web_ui';

export interface State {
  todoHeap: TodoHeap;
  messageGroups: MessageGroups;
  todoRefs: Map<number, TodoModel>;
}
