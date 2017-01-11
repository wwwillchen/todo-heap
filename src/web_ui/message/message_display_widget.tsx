import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MessageGroupWidget, MessageGroupProps } from './';

export type MessageGroups = MessageGroupProps[];
export interface MessageDisplayProps {
    groups: MessageGroupProps[];
}

export class MessageDisplayWidget extends React.Component<MessageDisplayProps, null> {
    componentDidUpdate() {
        const R = ReactDOM as any;
        const node = R.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }

    render() {
        return (
            <div id="main">
                {this.props.groups.map(group => <MessageGroupWidget
                    key={group.id} id={group.id}
                    warnings={group.warnings}
                    command={group.command}
                    messages={group.messages} />)}
            </div>
        );
    }
}