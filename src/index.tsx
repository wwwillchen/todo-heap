import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import {App, AppProps} from './web_ui/app';
import {todoReducer} from './todo_reducer/todo_reducer';
import {State, mapStateToProps} from './todo_state/state';
import {mapDispatchToProps} from './todo_action/actions';

import {messageStubs} from './test_helpers/stubs';

const preloadedState: State = {
  messageGroups: messageStubs,
  todoMap: new Map(),
  todoHeap: [],
};

const store = createStore(todoReducer, preloadedState);

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);