import * as React from 'react';

import { Grid } from 'semantic-ui-react'
import { Input, Menu } from 'semantic-ui-react'
import { Container, Header } from 'semantic-ui-react'

import './app.css';

import {MessageDisplayWidget, MessageGroups, MessageDisplayProps} from './message/message_display_widget';
import {ChatInputWidget} from './chat_input';

const HeaderWidget = () => (
  <div id="header">
    <Header as="h2">Todo Heap</Header>
  </div>
)

export interface AppProps {
  messageGroups: MessageGroups,
}

export const App = (props: AppProps) => (
        <div id='app'>
            <HeaderWidget/>
            <MessageDisplayWidget groups={props.messageGroups}/>
            <ChatInputWidget/>
        </div>
);
