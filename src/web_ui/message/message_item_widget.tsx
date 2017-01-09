import * as React from 'react';

import { Message, Label, Icon } from 'semantic-ui-react';

export interface MessageItemProps {
  priority: number;
  text: string;
  id: string;
  todoRef: number;
  removed: boolean;
}

export const MessageItemWidget = (props: MessageItemProps) => (
  <Message.Item>
    <div style={props.removed ? {textDecoration: "line-through"} : {}}>
      <Label> {props.todoRef} </Label>
      <span>P{props.priority}</span> {props.text} <span className="item-id"> [{props.id.slice(0,8)}]</span>
    </div>
  </Message.Item>
);