import * as React from 'react';
import { Message } from 'semantic-ui-react';

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
