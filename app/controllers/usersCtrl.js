'use strict';

import AppCtrl from './appCtrl';
import compose from 'koa-compose';
import moment from 'moment';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../assets/javascripts/routes';
import store from '../assets/javascripts/store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class UsersCtrl extends AppCtrl {
  index() {
    return async (ctx) => {
      ctx.state = this.assets;

      match({ routes, location: ctx.request.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          ctx.status = 500;
          ctx.body = error.message;
        } else if (redirectLocation) {
          ctx.status = 302;
          ctx.body = redirectLocation.pathname + redirectLocation.search;
        } else if (renderProps) {
          ctx.status = 200;
          ctx.state.markup = renderToString(<MuiThemeProvider muiTheme={getMuiTheme({ userAgent: ctx.request.headers['user-agent'] })}>
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          </MuiThemeProvider>);
        } else {
          ctx.status = 404;
          ctx.body = 'Not Found';
        }
      });

      await ctx.render('users/index');
    };
  }

  show() {
    return async (ctx) => {
      ctx.state = this.assets;
      await ctx.render('users/show');
    };
  }
}
