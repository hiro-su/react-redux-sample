import request from 'request';
import Bluebird from 'bluebird';
import _ from 'lodash';
import { settings } from '../../config';

export default class GspcpService {
  constructor(ctx) {
    request.debug = settings.debug || false;
    Bluebird.promisifyAll(request);
    this.ctx = ctx;
  }

  async validToken(params) {
    const url = settings.gspcp + '/valid/token';
    const endpoint = {
      url: url,
      proxy: settings.proxy,
      json: true
    };

    params = _.extend({}, params, endpoint);

    await request.getAsync(params).then((result) => {
      if (result.statusCode !== 200) this.ctx.throw(result.body.errorMsg, result.statusCode);
      return true;
    }).catch((error) => {
      return this.ctx.throw(error, error.statusCode);
    });
  }

  async logout(params) {
    const url = settings.gspcp + '/auth/destroy';
    const endpoint = {
      url: url,
      proxy: settings.proxy
    };
    params = _.extend({}, params, endpoint);
    await request.getAsync(params).then((result) => {
      if (result.statusCode !== 204) this.ctx.throw(result.body.errorMsg, result.statusCode);
    }).catch((error) => {
      return this.ctx.throw(error, error.statusCode);
    });
  }
}
