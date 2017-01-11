import * as React from 'react';

import { Input } from 'semantic-ui-react';

export interface ChatInputProps {
    action: any;
}

const onSubmit = (e: any) => {
    e.preventDefault();
};

export const ChatInputWidget = (props: ChatInputProps) => (
    <div id="footer">
        <div className="ui left icon input fluid">
            <i className="terminal icon"></i>
            <input autoFocus type="text" placeholder="Enter command..." onKeyDown={(e) => {
                const t = e.target as any;
                if (e.keyCode === 13) {
                    props.action(t.value);
                    t.value = '';
                }
            } } />
        </div>
    </div>
);