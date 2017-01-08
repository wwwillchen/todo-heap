import * as React from 'react';

import { Message } from 'semantic-ui-react';

import {MessageItemWidget, MessageItemProps} from './message_item_widget';

export interface MessageGroupProps {
  messages: MessageItemProps[];
  id: string;
  command: string;
}

export const MessageGroupWidget = (props: MessageGroupProps) => (
  <Message>
    <Message.Header>{props.command}</Message.Header>
    <Message.List>
      {props.messages.map(m => <MessageItemWidget key={m.id} id={m.id} text={m.text} priority={m.priority}/>)}
    </Message.List>
  </Message>
);
