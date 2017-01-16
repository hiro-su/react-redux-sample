'use strict';

import Router from 'koa-router';
const router = Router();

import UsersCtrl from '../app/controllers/usersCtrl';
import SampleCtrl from '../app/controllers/sampleCtrl';

const users = new UsersCtrl();
const sample = new SampleCtrl();

router
  .get('*', users.index());

router
  .post('/find', sample.find())
  .del('/find/:id', sample.delete())
  .post('/find/:id', sample.show())
  .post('/add', sample.add());

module.exports = router;
