import * as React from 'react';

import { Message } from 'semantic-ui-react';

import {MessageItemWidget, MessageItemProps, MessageWarningWidget} from './';

export interface MessageGroupProps {
  messages: MessageItemProps[];
  id: string;
  command: string;
  warnings?: string[];
}

export const MessageGroupWidget = (props: MessageGroupProps) => {
  const warnings = props.warnings ? props.warnings.map(w =>
            <MessageWarningWidget text={w} key={w}>
            </MessageWarningWidget>
          ): null;
  return (
    <Message>
      <Message.Header>{props.command}</Message.Header>
      <Message.List>
        {warnings}
        {props.messages.map(m =>
          <MessageItemWidget
            removed={m.removed}
            todoRef={m.todoRef}
            key={m.id} id={m.id}
            text={m.text}
            priority={m.priority}/>)}
      </Message.List>
    </Message>
  );
};