'use strict';

import AppCtrl from './appCtrl';
import { Sample } from '../model';

const sample = new Sample();

export default class SampleCtrl extends AppCtrl {
  find() {
    return async (ctx) => {
      let searchcondition;
      if( typeof ctx.request.body.searchWord === "string" ){
        searchcondition = ctx.request.body.searchWord;
      } else {
        return ctx.status = 500;
      }
      return sample.find(searchcondition).then((sampleList) => {
        return ctx.body = {sampleList};
      });
    }
  }

  show() {
    return async (ctx) => {
      return sample.findOne(ctx.params.id).then((row) => {
        return ctx.body = row;
      });
    };
  }

  delete() {
    return async (ctx) => {
      return sample.remove(ctx.params.id).then((res) => {
        return ctx.body = res;
      });
    };
  }

  add() {
    return async (ctx) => {
      const insertData = await sample.add(ctx.request.body.title);
      console.log(insertData);

      ctx.status = 200;
      return ctx.body = { insertData: insertData };
    };
  }
}
