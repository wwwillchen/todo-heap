import { MessageGroupProps } from '../web_ui';
import { MessageItemProps } from '../web_ui';
import { TodoModel } from '../todo_object';
import { guid } from '../utils';
import { TodoViewModel } from "./";

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