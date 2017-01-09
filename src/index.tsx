import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import {App, AppProps} from './web_ui/app';
import {todoReducer} from './todo_domain';
import {State} from './todo_state/state';
import {textInputActionCreator} from './todo_action/actions';

import {messageStubs, todoStubs} from './test_helpers/stubs';

const preloadedState: State = {
  messageGroups: messageStubs,
  todoMap: new Map(),
  todoHeap: todoStubs,
  todoRefs: new Map(),
};

const w = window as any;
const store = createStore(todoReducer, preloadedState,
    w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__()
);

const mapDispatchToProps = (dispatch: any) => ({
  dispatch,
  actions: bindActionCreators({textInputActionCreator}, dispatch)
});

const mapStateToProps = (state: State) => ({
  messageGroups: state.messageGroups,
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);