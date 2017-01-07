import * as React from 'react';

import { Message } from 'semantic-ui-react'

export const MessageGroupWidget = () => (
  <Message>
    <Message.Header>list -n 5</Message.Header>
    <Message.List>
      <Message.Item>add feedback to the contribution guide</Message.Item>
      <Message.Item>check the HTTP status updates</Message.Item>
      <Message.Item>add feedback to the contribution guide</Message.Item>
      <Message.Item>check the HTTP status updates</Message.Item>
      <Message.Item>add feedback to the contribution guide</Message.Item>
      <Message.Item>check the HTTP status updates</Message.Item>
    </Message.List>
  </Message>
)
