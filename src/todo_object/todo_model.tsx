import { TodoEntity, TodoDate } from "./";

export class TodoModel implements TodoEntity {
    public id: string;
    public priority: number;
    public text: string;
    public removed: boolean;
    public timeCreated: TodoDate;
    public timeRemoved: TodoDate;

    constructor(data: TodoEntity) {
        Object.assign(this, data);
        this.markCreated();
    }

    markCreated() {
        this.timeCreated = Date.now();
    }

    markRemoved() {
        this.timeRemoved = Date.now();
        this.removed = true;
    }

}