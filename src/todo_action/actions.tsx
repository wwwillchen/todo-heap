export const TEXT_INPUT = 'TEXT_INPUT';

export interface Action {
    type: string;
    command: string;
}

export function textInputActionCreator(command: string): Action {
    return {
        type: TEXT_INPUT,
        command,
    };
}