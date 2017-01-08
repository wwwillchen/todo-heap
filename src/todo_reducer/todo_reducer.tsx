import {State} from '../todo_state/state';
import {TodoFactory} from '../todo/todo_factory';
import {MessageGroupFactory} from "../message_presenter/message_factory";
import {textInputActionCreator, Action, TEXT_INPUT} from '../todo_action/actions';

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
      return remove(newState, parsedAction);
  }
  return newState;
}

const add = (state: State, parsedAction: addCommand): State => {
  const todo = TodoFactory.createTodo(parsedAction.text);
  state.todoHeap = [todo, ...state.todoHeap];
  let messageGroup = MessageGroupFactory.create(parsedAction.command, [todo]);
  state.messageGroups = [...state.messageGroups, messageGroup];
  return state;
};

const list = (state: State, parsedAction: listCommand): State => {
  let messageGroup = MessageGroupFactory.create(parsedAction.command, state.todoHeap.slice(0, 5));
  state.messageGroups = [...state.messageGroups, messageGroup];
  return state;
}

const remove = (state: State, parsedAction: removeCommand): State => {
  state.todoHeap = state.todoHeap.filter(t => !t.id.includes(parsedAction.target))
  let messageGroup = MessageGroupFactory.create(parsedAction.command, state.todoHeap.slice(0, 5));
  state.messageGroups = [...state.messageGroups, messageGroup];
  return state;
}

type TodoCommandTypes = 'add' | 'list' | 'remove' | 'edit' | 'commit' | 'invalid';

interface invalidCommand {
  commandType: 'invalid';
}

interface addCommand {
  command: string;
  commandType: 'add';
  flags: Object | null;
  text: string;
}

interface listCommand {
  command: string;
  commandType: 'list';
  flags: Object | null;
}

interface removeCommand {
  command: string;
  commandType: 'remove';
  target: string;
  flags: Object | null;
}

function isValidCommandType(actionWord: string): actionWord is TodoCommandTypes {
    return ['add', 'list', 'edit', 'commit', 'remove'].indexOf(actionWord) !== -1;
}

const mapAlias = (commandType: string): string => ({
  'ls': 'list',
  'l': 'list',
  'a': 'add',
  'rm': 'remove',
}[commandType])

function parseCommand(command: string): invalidCommand | addCommand | listCommand | removeCommand {
  const tokens = command.split(' ');
  const commandType = mapAlias(tokens[0]);
  if (!isValidCommandType(commandType))
    return {commandType: 'invalid'};
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
    }
  if (commandType === 'remove') {
    // Make sure target is at least 5 characters long
    const target = tokens[1];
    if (target && target.length > 5)
      return {
        command,
        commandType,
        target: target,
        flags: {},
      }
  }
  return {commandType: 'invalid'};
}
