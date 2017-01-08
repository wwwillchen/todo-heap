import {MessageGroupProps} from '../web_ui/message/message_group_widget';
import {MessageItemProps} from '../web_ui/message/message_item_widget';
import {TodoModel} from '../todo/todo_entity';
import {guid} from '../utils/utils';

export interface TodoViewModel extends TodoModel {
  todoRef: number;
}

export class MessageGroupFactory {
  static create(command: string, todos: TodoViewModel[]): MessageGroupProps {
    return {
      command: command,
      messages: todos.map(t => MessageFactory.create(t)),
      id: guid(),
    };
  }

  static createInvalid(command: string): MessageGroupProps {
    return {
      command: command,
      messages: [],
      warnings: ['Invalid command'],
      id: guid(),
    };
  }
}

export class MessageFactory {
  static create(todo: TodoViewModel): MessageItemProps {
    return todo;
  }
}