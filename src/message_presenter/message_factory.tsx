import {MessageGroupProps} from '../web_ui/message/message_group_widget';
import {MessageItemProps} from '../web_ui/message/message_item_widget';
import {TodoModel} from '../todo/todo_entity';
import {guid} from '../utils/utils';

export class MessageGroupFactory {
  static create(command: string, todos: TodoModel[]): MessageGroupProps {
    return {
      command: command,
      messages: todos.map(t => MessageFactory.create(t)),
      id: guid(),
    };
  }
}

export class MessageFactory {
  static create(todo: TodoModel): MessageItemProps {
    return todo;
  }
}