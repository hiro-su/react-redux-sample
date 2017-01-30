import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import createRoute from './routes';
import { syncHistoryWithStore } from 'react-router-redux'; import store, { baseHistory } from './store';

//allow react dev tools work
window.React = React;

const routes = createRoute;

const history = syncHistoryWithStore(baseHistory, store);

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
);
