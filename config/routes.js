'use strict';

import Router from 'koa-router';
const router = Router();

import UsersCtrl from '../app/controllers/usersCtrl';
import SampleCtrl from '../app/controllers/sampleCtrl';

const users = new UsersCtrl();
const sample = new SampleCtrl();

router
  .get('*', users.index());
  //.get( '/users', users.index())
  //.get( '/users/:id', users.show());

router
  .post('/find', sample.find())
  .post('/add', sample.add());

module.exports = router;
