'use strict';

import Router from 'koa-router';
const router = Router();

import ctrl from '../app/controllers';

const users = new ctrl.Users();
const sample = new ctrl.Sample();

router
  .get('*', users.index());

router
  .post('/find', sample.find())
  .del('/find/:id', sample.delete())
  .post('/find/:id', sample.show())
  .post('/add', sample.add());

module.exports = router;
