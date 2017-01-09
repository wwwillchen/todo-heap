/*
 * Backing Store guide:
 * 1. transactionLog sheet
 *   Each row states the change that happened
 *   Add / remove / edit - id - priority - text
 * 2. todoHeap sheet
 *    id: string;
 *    priority: number;
 *    text: string;
      timeCreated: TodoDate;
      timeRemoved: TodoDate;
      removed: boolean;
 *
 */