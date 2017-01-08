import * as React from 'react';

import { Message } from 'semantic-ui-react';

import {MessageItemWidget, MessageItemProps} from './';

export interface MessageGroupProps {
  messages: MessageItemProps[];
  id: string;
  command: string;
  warnings?: string[];
}

export interface MessageWarningProps {
  text: string;
}

export const MessageWarningWidget = (props: MessageWarningProps) => (
  <Message error>
    <Message.Item>
      {props.text}
    </Message.Item>
  </Message>
);

export const MessageGroupWidget = (props: MessageGroupProps) => {
  const warnings = props.warnings ? props.warnings.map(w =>
            <MessageWarningWidget text={w}>
            </MessageWarningWidget>
          ): null;
  return (
    <Message>
      <Message.Header>{props.command}</Message.Header>
      <Message.List>
        {warnings}
        {props.messages.map(m =>
          <MessageItemWidget
            todoRef={m.todoRef}
            key={m.id} id={m.id}
            text={m.text}
            priority={m.priority}/>)}
      </Message.List>
    </Message>
  );
};