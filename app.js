'use strict';

import Koa from 'koa';
import views from 'koa-views';
import serve from 'koa-static';
import logger from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import moment from 'moment';
import { router } from './config';

const app = new Koa();

// set logger
logger.token('date', format => {
  const clf = 'DD/MMM/YYYY:HH:mm:ss ZZ';
  return moment(format._startTime).format(clf);
});
app.use(logger('combined', { immediate: true }));

// error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (ctx.status >= 500 || err.status >= 500) {
      console.error(err);
    }
    ctx.body = { errorMsg: err.message };
    ctx.status = err.status || 500;
  }
});

// request body
app.use(bodyParser({ enableTypes: ['json'] }));

// render
app
  .use(views(__dirname + '/app/views', { extension: 'pug' }))
  .use(serve(__dirname + '/public'));

// routing
app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
