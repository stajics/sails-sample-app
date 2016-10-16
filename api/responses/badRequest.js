"use strict";

/**
 * 400 (Bad Request) Response
 *
 * The request cannot be fulfilled due to bad syntax.
 * General error when fulfilling the request would cause an invalid state.
 * Domain validation errors, missing data, etc.
 */

const _ = require('lodash');

module.exports = function (data, config) {

  const response = _.assign({
    status: _.get(config, 'status', 'fail'),
    data: {message: _.get(config, 'message', 'The request cannot be fulfilled due to bad syntax'), details: data}
  }, _.get(config, 'root', {}));


  if(_.isEmpty(response.data.details)) {
    if(data instanceof Error) {
      response.data.details = data.toString();
    } else {
      delete response.data.details;
    }
  }
  // if(!response.data.details || response.data.details instanceof Error) {
  //   if(response.data.details instanceof Error) {
  //      console.log(response.data.details);
  //   }
  //   //delete response.data.details;
  // }

  this.res.status(400);
  this.res.jsonx(response);
};
