import * as React from 'react';

import { Grid } from 'semantic-ui-react'
import { Input, Menu } from 'semantic-ui-react'
import { Container, Header } from 'semantic-ui-react'

import './app.css';

import {MessageGroupWidget} from './message_group_widget';

const HeaderWidget = () => (
  <div id='header'>
    <Header as='h2'>Todo Heap</Header>
  </div>
)

const ChatDisplayWidget = () => (
  <div id='main'>
    <MessageGroupWidget/>
    <MessageGroupWidget/>
    <MessageGroupWidget/>
    <MessageGroupWidget/>
  </div>
)

const ChatInputWidget = () => (
  <div id='footer'>
    <Input inverted fluid icon='terminal' placeholder='Command...' />
  </div>
)

class App extends React.Component<null, null> {
  render() {
    return (
        <div id='app'>
            <HeaderWidget/>
            <ChatDisplayWidget />
            <ChatInputWidget/>
        </div>
    );
  }
}

export default App;
