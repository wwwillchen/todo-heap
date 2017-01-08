import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import * as renderer from 'react-test-renderer';

import {MessageItemWidget} from '../message_item_widget';
import {MessageGroupWidget, MessageGroupProps} from '../message_group_widget';
import {MessageDisplayWidget} from '../message_display_widget';

it('renders a message item', () => {
  const wrapper = mount(<MessageItemWidget id={'1'} key={'1'} priority={1} text={'Take out the trash'}/>);
  expect(wrapper.text()).toEqual("P1 Take out the trash");
});

it('renders a message group', () => {
  const messages = [
    {id: '1', priority: 1, text: 'foo bar'},
    {id: '2', priority: 1, text: 'baz'},
    {id: '3', priority: 2, text: 'what'},
  ];

  const component = renderer.create(
    <MessageGroupWidget messages={messages} id={'1'} command='ls -n 5'/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a message display', () => {
  const messages = [
    {id: '1', priority: 1, text: 'foo bar'},
    {id: '2', priority: 1, text: 'baz'},
    {id: '3', priority: 2, text: 'what'},
  ];
  const groups = [
    {id: '1', command: 'list -n 10', messages},
    {id: '2', command: 'list -n 10', messages},
    {id: '3', command: 'list -n 10', messages},
  ];

  const component = renderer.create(
    <MessageDisplayWidget groups={groups}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});