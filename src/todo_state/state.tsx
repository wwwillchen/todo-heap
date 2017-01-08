import {TodoModel} from '../todo/todo_entity';

export interface State {
  todoHeap: TodoModel[],
  todoMap: Map<string, TodoModel>,
  displayGroups: any[],
}

export const mapStateToProps = (state: State) => ({
  displayGroups: state.displayGroups,
});