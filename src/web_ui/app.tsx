import * as React from 'react';

import './app.css';

import { textInputActionCreator } from '../todo_action';
import {MessageDisplayWidget, MessageGroups, MessageDisplayProps} from './message';
import {ChatInputWidget, HeaderWidget} from './';

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
