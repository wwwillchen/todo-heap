import { createStore, bindActionCreators } from 'redux'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

function addTodo(text: string) {
  return {
    type: ADD_TODO,
    text,
  }
}

function removeTodo(id: string) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

export const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators({addTodo, removeTodo}, dispatch)
})