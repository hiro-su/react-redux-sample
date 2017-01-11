'use strict';

import AppCtrl from './appCtrl';
import compose from 'koa-compose';
import moment from 'moment';

export default class UsersCtrl extends AppCtrl {
  clients = [];

  index() {
    return async (ctx) => {
      ctx.state = this.assets;
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
