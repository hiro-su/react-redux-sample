'use strict';

import AppCtrl from './appCtrl';
import Sample from '../model/sample';
import { getForwardMatchString } from './concerns';

export default class SampleCtrl extends AppCtrl {
  find() {
    return async (ctx) => {
      let searchcondition = {};
      // check sql injection
      if( typeof ctx.request.body.searchWord === "string" ){
        searchcondition = {
          title: getForwardMatchString(ctx.request.body.searchWord)
        };
      } else {
        return ctx.status = 500;
      }
      return Sample.find(searchcondition).exec((err, sampleList) => {
        if (err) {
          console.log('sampleController/find error');
          console.log(err);
          return ctx.status = 500;
        }

        return ctx.body = {sampleList};
      });
    }
  }

  show() {
    return async (ctx) => {
      return Sample.findOne({ _id: ctx.params.id }).exec((err, sample) => {
        return ctx.body = sample;
      });
    };
  }

  /**
   * Add
   */
  add() {
    return async (ctx) => {
      const tmpInsertData = new Sample({
        title: ctx.request.body.title
      });

      return tmpInsertData.save((saveErr) => {
        if (saveErr){
          console.log("sampleController/add saveErr");
          console.log(saveErr);
          return ctx.status = 500;
        }
        tmpInsertData.isUpdate = false;
        ctx.status = 200;
        return ctx.body = { insertData: tmpInsertData };
      });
    }
  }
}
