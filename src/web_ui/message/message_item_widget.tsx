import * as React from 'react';

import { Message, Label, Icon } from 'semantic-ui-react';

export interface MessageItemProps {
  priority: number;
  text: string;
  id: string;
  todoRef: number;
}

export const MessageItemWidget = (props: MessageItemProps) => (
  <Message.Item>
    <Label> {props.todoRef} </Label>
    P{props.priority} {props.text} <span className="item-id"> [{props.id.slice(0,8)}]</span>
  </Message.Item>
);