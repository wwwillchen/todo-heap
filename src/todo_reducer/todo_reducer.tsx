import {State} from '../todo_state/state';
import {TodoModel} from '../todo/todo_entity';
import {TodoFactory} from '../todo/todo_factory';
import {MessageGroupFactory, TodoViewModel} from '../message_presenter/message_factory';
import {textInputActionCreator, Action, TEXT_INPUT} from '../todo_action/actions';
import {reject, includes} from '../utils';

export const todoReducer = (state: State, action: Action): State => {
  const newState = Object.assign({}, state);
  if (action.type !== TEXT_INPUT)
    return newState;
  const parsedAction = parseCommand(action.command);
  switch (parsedAction.commandType) {
    case 'add':
      return add(newState, parsedAction);
    case 'list':
      return list(newState, parsedAction);
    case 'remove':
      parsedAction.targets = mapTargets(newState, parsedAction.targets);
      return remove(newState, parsedAction);
    case 'invalid':
      return invalid(newState, parsedAction);
  }
  return newState;
};

const add = (state: State, parsedAction: AddCommand): State => {
  const todo = TodoFactory.createTodo(parsedAction.text);
  state.todoHeap = [todo, ...state.todoHeap];
  let todoViewModels;
  ({state, todoViewModels} = mapRefs(state, [todo]));
  let messageGroup = MessageGroupFactory.create(parsedAction.command, todoViewModels);
  state.messageGroups = [...state.messageGroups, messageGroup];
  return state;
};

const DEFAULT_SIZE = 5;

const list = (state: State, parsedAction: AbstractCommand): State => {
  let todoViewModels;
  ({state, todoViewModels} = mapRefs(state, state.todoHeap.slice(0, DEFAULT_SIZE)));
  let messageGroup = MessageGroupFactory.create(parsedAction.command, todoViewModels);
  state.messageGroups = [...state.messageGroups, messageGroup];
  return state;
};

const remove = (state: State, parsedAction: RemoveCommand): State => {
  state.todoHeap = reject(state.todoHeap, todo => includes(parsedAction.targets, todo.id));
  return list(state, parsedAction);
};

const invalid = (state: State, parsedAction: InvalidCommand): State => {
  state.messageGroups = [...state.messageGroups, MessageGroupFactory.createInvalid(parsedAction.command)];
  return state;
};

const mapRefs = (state: State, todos: TodoModel[]): {state: State, todoViewModels: TodoViewModel[]} => {
  state.todoRefs = new Map();
  let id = 1;
  const todoViewModels = todos.map(t => {
    state.todoRefs.set(id, t);
    return Object.assign({}, t, {todoRef: id++});
  });
  return {state, todoViewModels};
};

const mapTargets = (state: State, targets: string[]): string[] => {
  return targets.map((target) => {
    const parsedTarget = parseInt(target, 10);
    if (isNaN(target as any) && parsedTarget > 0 && parsedTarget < 100)
      return target;
    if (state.todoRefs.has(parsedTarget)) {
      const todoModel = state.todoRefs.get(parsedTarget) as TodoModel;
      return todoModel.id;
    }
    return target;
  });
};

type TodoCommandTypes = 'add' | 'list' | 'remove' | 'edit' | 'commit' | 'invalid';

interface AbstractCommand {
  command: string;
  commandType: TodoCommandTypes;
  flags?: Object | null;
}

interface InvalidCommand extends AbstractCommand {
  commandType: 'invalid';
}

interface AddCommand extends AbstractCommand {
  commandType: 'add';
  text: string;
}

interface ListCommand extends AbstractCommand {
  commandType: 'list';
}

interface RemoveCommand extends AbstractCommand {
  commandType: 'remove';
  targets: string[];
}

function isValidCommandType(actionWord: string): actionWord is TodoCommandTypes {
    return ['add', 'list', 'edit', 'commit', 'remove'].indexOf(actionWord) !== -1;
}

const mapAlias = (commandType: string): string => ({
  'ls': 'list',
  'l': 'list',
  'a': 'add',
  'rm': 'remove',
}[commandType] || commandType);

function tokenize(command: string): string[] {
  return command.split(' ').map(word => {
    if (isNaN(word as any)) {
      return word;
    }
    return word;
  });
}

function parseCommand(command: string): InvalidCommand | AddCommand | ListCommand | RemoveCommand {
  const tokens = tokenize(command);
  const commandType = mapAlias(tokens[0]);
  const invalidCommand: InvalidCommand = {commandType: 'invalid', command};
  if (!isValidCommandType(commandType))
    return invalidCommand;
  if (commandType === 'add')
    return {
      command,
      commandType,
      text: tokens.slice(1).join(' '),
      flags: {},
    };
  if (commandType === 'list')
    return {
      command,
      commandType,
      flags: {},
    };
  if (commandType === 'remove') {
    const targets = tokens.slice(1);
    if (targets.length)
      return {
        command,
        commandType,
        targets,
        flags: {},
      };
  }
  return invalidCommand;
}
