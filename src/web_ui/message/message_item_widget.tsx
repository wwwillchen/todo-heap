import * as React from 'react';

import { Message } from 'semantic-ui-react';

export interface MessageItemProps {
  priority: number;
  text: string;
  id: string;
}

export const MessageItemWidget = (props: MessageItemProps) => (
  <Message.Item>P{props.priority} {props.text} [{props.id.slice(0,8)}]</Message.Item>
);