type TodoStatus = 'Done' | 'NotDone' | 'Deleted';
type TodoDate = number | null;

export interface TodoEntity {
  id: string;
  priority: number;
  text: string;
  status: TodoStatus;
  timeCreated: TodoDate;
  timeDone: TodoDate;
  timeDeleted: TodoDate;
}

export class TodoModel implements TodoEntity {
  public id: string;
  public priority: number;
  public text: string;
  public status: TodoStatus;
  public timeCreated: TodoDate;
  public timeDone: TodoDate;
  public timeDeleted: TodoDate;
  constructor(data: TodoEntity) {
    Object.assign(this, data);
  }
  markCreated() {
    this.timeCreated = Date.now();
  }
  markDone() {
    this.timeDone = Date.now();
  }
  markDeleted() {
    this.timeDeleted = Date.now();
  }
}
