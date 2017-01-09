export type TodoStatus = 'Done' | 'NotDone' | 'Deleted';
export type TodoDate = number | null;

export interface TodoEntity {
  id: string;
  priority: number;
  text: string;
  status: TodoStatus;
  timeCreated: TodoDate;
  timeDone: TodoDate;
  timeDeleted: TodoDate;
}
