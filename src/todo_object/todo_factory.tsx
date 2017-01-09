import {TodoModel} from './';
import {guid} from '../utils';

export class TodoFactory {
  static createTodo(text: string, priority?: number): TodoModel {
    return new TodoModel({
      text,
      id: guid(),
      priority: priority || 0,
      timeCreated: null,
      timeRemoved: null,
      removed: false,
    });
  }
}