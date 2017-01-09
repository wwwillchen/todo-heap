import {TodoModel} from "./";

export class TodoHeap {
  static clone() {

  }
  constructor() {
    this._data = [];
  }
  sort() {
    this._data = this._data.sort((a, b) => a.priority - b.priority);
  }
  private _data: TodoModel[];
}