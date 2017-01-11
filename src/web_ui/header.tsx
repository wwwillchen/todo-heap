import * as React from 'react';
import { Header } from 'semantic-ui-react';

import {AuthButton} from "./";

export const HeaderWidget = () => (
  <div id="header">
    <Header as="h2">Todo Heap</Header>
    <AuthButton/>
  </div>
);