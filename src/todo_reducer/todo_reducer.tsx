import {ADD_TODO, REMOVE_TODO} from "../todo_action/actions";
import {State} from '../todo_state/state';

export const todoReducer = (state: State, action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    default:
      return state
  }
}
