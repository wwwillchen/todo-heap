import * as React from 'react';

import {CLIENT_ID, SCOPES, loadSheetsApi} from "../backing_store";

// Dependency inject

interface AuthButtonState {
  shouldAuthenticate: boolean;
}

export class AuthButton extends React.Component<null, AuthButtonState> {

  constructor() {
    super();
    this.state = {
      shouldAuthenticate: true
    };
    // this.checkAuth();
  }

  handleAuthClick(event: React.MouseEvent<HTMLButtonElement>) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      this.handleAuthResult.bind(this));
    return false;
  }

  handleAuthResult(authResult: any) {
    if (authResult && !authResult.error) {
      this.setState({shouldAuthenticate: false});
      loadSheetsApi();
    } else {
      this.setState({shouldAuthenticate: true});
    }
  }

  checkAuth() {
    gapi.auth.authorize(
      {
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
      }, this.handleAuthResult.bind(this));
  }

  render() {
    return (
      <button id="authorize-button" onClick={e => this.handleAuthClick(e)}
        style={this.state.shouldAuthenticate ? {} : {display: "none"}}>
       Authorize Google Sheets
      </button>
    );
  }
}