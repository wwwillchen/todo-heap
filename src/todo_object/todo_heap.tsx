import { TodoModel } from "./";

export class TodoHeap {
    private _data: TodoModel[];
    constructor(data?: TodoModel[]) {
        this._data = data ? data : [];
    }

    clone() {
        const newInstance = new TodoHeap();
        newInstance._data = this._data;
        return newInstance;
    }

    sort() {
        this._data = this._data.sort((a, b) => a.priority - b.priority);
    }

    add(todo: TodoModel) {
        this._data.push(todo);
        this.sort();
    }

    remove(id: string): boolean | TodoModel {
        let didRemove: boolean | TodoModel = false;
        this._data = this._data.map(todoModel => {
            if (todoModel.id === id) {
                todoModel.markRemoved();
                didRemove = todoModel;
            }
            return todoModel;
        });
        return didRemove;
    }

    forceRemove(id: string): boolean | TodoModel {
        let didRemove: boolean | TodoModel = false;
        this._data = this._data.filter(todoModel => {
            if (todoModel.id === id) {
                didRemove = todoModel;
                return false;
            }
            return true;
        });
        return didRemove;
    }

    getData(): TodoModel[] {
        return this._data;
    }

    getSize(): number {
        return this._data.length;
    }

    fetchAll(): TodoModel[] {
        return this._data.filter(t => !t.removed);
    }

    fetchFromTop(n: number): TodoModel[] {
        return this.fetchAll().slice(0, n);
    }

    fetchFromBottom(n: number): TodoModel[] {
        return this.fetchAll().slice().reverse().slice(0, n);
    }
}