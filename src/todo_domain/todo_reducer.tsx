import {State} from '../todo_state';
import {TodoModel, TodoFactory} from '../todo_object';
import {MessageGroupFactory, TodoViewModel} from '../presenter';
import {textInputActionCreator, Action, TEXT_INPUT} from '../todo_action';
import {reject, includes} from '../utils';
import {parseArgs} from "./parse_args";

export const todoReducer = (state: State, action: Action): State => {
  const newState = Object.assign({}, state, {
    todoHeap: state.todoHeap.clone(),
    messageGroups: state.messageGroups.slice(),
  });
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
  state.todoHeap.add(todo);
  state.messageGroups.push(MessageGroupFactory.create(parsedAction.command, mapRefs(state, [todo])));
  return state;
};

const DEFAULT_SIZE = 5;

const list = (state: State, parsedAction: AbstractCommand): State => {
  const flags = parsedAction.flags as any;
  const numberToDisplay = flags.all && state.todoHeap.getSize() || flags.number || DEFAULT_SIZE;
  const fetch = flags.reverse ? state.todoHeap.fetchFromTop : state.todoHeap.fetchFromBottom;
  const todos = fetch(numberToDisplay);
  state.messageGroups.push(MessageGroupFactory.create(parsedAction.command, mapRefs(state, todos)));
  return state;
};

const remove = (state: State, parsedAction: RemoveCommand): State => {
  const todos = parsedAction.targets.map(target => state.todoHeap.remove(target)).filter(x => !!x) as TodoModel[]
  state.messageGroups.push(MessageGroupFactory.create(parsedAction.command, mapRefs(state, todos)));
  return state;
};

const invalid = (state: State, parsedAction: InvalidCommand): State => {
  state.messageGroups = [...state.messageGroups, MessageGroupFactory.createInvalid(parsedAction.command)];
  return state;
};

const mapRefs = (state: State, todos: TodoModel[]): TodoViewModel[] => {
  state.todoRefs = new Map();
  let id = 1;
  const todoViewModels = todos.map(t => {
    state.todoRefs.set(id, t);
    return Object.assign({}, t, {todoRef: id++});
  });
  return todoViewModels;
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
  flags: {string: string[]};
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

const mapAlias = (commandType: string): string => commandAlias[commandType] || commandType;

function tokenize(command: string): string[] {
  return command.split(' ').map(word => {
    if (isNaN(word as any)) {
      return word;
    }
    return word;
  });
}

const commandAlias = {
  'ls': 'list',
  'l': 'list',
  'a': 'add',
  'rm': 'remove',
  'h': 'help',
};

const flagAlias = {
  'n': 'number',
  'p': 'priority',
  'r': 'reverse',
  'a': 'all',
};

function parseCommand(command: string): InvalidCommand | AddCommand | ListCommand | RemoveCommand {
  const argsObject = parseArgs(command, flagAlias);
  const unflaggedArgs = argsObject._;
  const flags = {...argsObject, _: undefined} as any;
  if (flags.number) {
    flags.number = parseInt(flags.number, 10);
  }
  const commandType = mapAlias(unflaggedArgs[0]);
  const invalidCommand: InvalidCommand = {
    commandType: 'invalid',
    command,
    flags,
  };
  if (!isValidCommandType(commandType))
    return invalidCommand;
  if (commandType === 'add')
    return {
      command,
      commandType,
      text: unflaggedArgs.slice(1).join(' '),
      flags,
    };
  if (commandType === 'list')
    return {
      command,
      commandType,
      flags,
    };
  if (commandType === 'remove') {
    const targets = unflaggedArgs.slice(1);
    if (targets.length)
      return {
        command,
        commandType,
        targets,
        flags,
      };
  }
  return invalidCommand;
}
