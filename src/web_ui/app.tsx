import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { textInputActionCreator } from '../todo_action/actions';

import './app.css';

import {MessageDisplayWidget, MessageGroups, MessageDisplayProps} from './message/message_display_widget';
import {ChatInputWidget} from './chat_input';

const HeaderWidget = () => (
  <div id="header">
    <Header as="h2">Todo Heap</Header>
  </div>
);

export interface AppProps {
  messageGroups: MessageGroups;
  actions: {
    textInputActionCreator: any,
  };
}

export const App = (props: AppProps) => (
  <div id="app">
      <HeaderWidget/>
      <MessageDisplayWidget groups={props.messageGroups}/>
      <ChatInputWidget action={props.actions.textInputActionCreator}/>
  </div>
);
