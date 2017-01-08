import * as React from 'react';

import {MessageGroupWidget, MessageGroupProps} from './message_group_widget';

export type MessageGroups = MessageGroupProps[];
export interface MessageDisplayProps {
  groups: MessageGroups;
}

export const MessageDisplayWidget = (props: MessageDisplayProps) => (
  <div id='main'>
    {props.groups.map(group => <MessageGroupWidget
      key={group.id} id={group.id}
      command={group.command}
      messages={group.messages}/>)}
  </div>
)
