import {TodoHeap, TodoFactory} from "../"

it('instantiate', () => {
  expect(new TodoHeap()).toBeTruthy();
});

it ('clone', () => {

})

it('add new todos', () => {
  const heap = new TodoHeap();
  const todo1 = TodoFactory.createTodo('hello world', 1);
  heap.add(todo1);
  expect(heap.getData()).toEqual([todo1]);
  const todo2 = TodoFactory.createTodo('hello baz');
  heap.add(todo2);
  expect(heap.getData()).toEqual([todo2, todo1]);
});

it('sort todo', () => {
  const heap = new TodoHeap();
  const todoP1 = TodoFactory.createTodo('t', 1);
  const todoP2 = TodoFactory.createTodo('t', 2);
  const todoP3 = TodoFactory.createTodo('t', 3);
  heap.add(todoP1);
  heap.add(todoP3);
  heap.add(todoP2);
  expect(heap.getData()).toEqual([todoP1, todoP2, todoP3]);
});

it('remove todo', () => {
  const heap = new TodoHeap();
  const todo1 = TodoFactory.createTodo('1', 1);
  const todo2 = TodoFactory.createTodo('2', 1);
  heap.add(todo1);
  heap.add(todo2);
  expect(heap.remove(todo1.id)).toEqual(todo1);
  expect(heap.remove(todo2.id + 'invalid')).toEqual(false);
  expect(todo1.removed).toEqual(true)
  expect(todo1.timeRemoved).toBeTruthy()
  expect(heap.getData()).toEqual([todo1, todo2]);
});