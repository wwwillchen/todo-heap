import { MessageGroups, MessageItemProps } from '../web_ui';
import { TodoModel, TodoFactory, TodoHeap } from '../todo_object';
import { guid } from '../utils';

const randomWords = `particles felt memory grandfather far feature those hot grow wish area table climb classroom exact cattle half age eager flight ancient nation physical powerful fully deeply examine best oldest syllable yesterday flew leave now section produce telephone six pitch pattern shinning kept surface push tone drink light thick little finally my inch grain difficult quickly favorite sink them except pain radio modern although original route object steep room halfway date quiet rapidly likely scientist stiff steel available whom brush ancient interest theory source milk add rubber lungs pick loss bread tonight piece written date happy rhythm tobacco inch front back`.split(' ');

const randomWord = () => randomWords[Math.floor(Math.random() * randomWords.length)];
const generateRandomMessage = (): MessageItemProps => {
    return {
        priority: Math.floor(Math.random() * 5),
        text: [randomWord(), randomWord(), randomWord()].join(' '),
        id: guid(),
        todoRef: 99,
        removed: false,
    };
};

const generateMessageGroup = () => {
    return {
        messages: [generateRandomMessage(), generateRandomMessage(), generateRandomMessage()],
        id: guid(),
        command: 'ls -n 5',
    };
};
export const messageStubs: MessageGroups = [
    generateMessageGroup(),
    generateMessageGroup(),
    generateMessageGroup(),
    generateMessageGroup(),
    generateMessageGroup(),
    generateMessageGroup(),
];

export const todoStubs: TodoModel[] = [];
messageStubs.map(g => g.messages.map(m => todoStubs.push(TodoFactory.createTodo(m.text, m.priority))));

export const todoHeapStub = new TodoHeap();
todoStubs.forEach(todo => todoHeapStub.add(todo));