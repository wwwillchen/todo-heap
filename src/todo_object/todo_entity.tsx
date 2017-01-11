export type TodoDate = number | null;

export interface TodoEntity {
    id: string;
    priority: number;
    text: string;
    timeCreated: TodoDate;
    timeRemoved: TodoDate;
    removed: boolean;
}
