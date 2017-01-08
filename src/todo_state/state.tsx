import {TodoModel} from '../todo/todo_entity';
import {MessageGroups} from "../web_ui/message/message_display_widget";

export interface State {
  todoHeap: TodoModel[],
  todoMap: Map<string, TodoModel>,
  messageGroups: MessageGroups,
}
