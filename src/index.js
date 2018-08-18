import "./styles/style.css";

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CherryNoteApp from './app'
import store from './store';

ReactDOM.render(
  <Provider store={store}><CherryNoteApp/></Provider>,
  document.getElementById('app')
);

module.hot.accept();