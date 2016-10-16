"use strict";

/**
 * 500 (Internal Server Error) Response
 *
 * A generic error message, given when no more specific message is suitable.
 * The general catch-all error when the server-side throws an exception.
 */

const _ = require('lodash');

module.exports = function (data, config) {
  console.log("data, config")
  const response = _.assign({
    status: _.get(config, 'status', 'fail'),
    data: {message: _.get(config, 'message', 'Something bad happened on the server'), details: data}
  });

  if(_.isEmpty(response.data.details)) {
    if(data instanceof Error) {
      response.data.details = data.toString();
    } else {
      delete response.data.details;
    }
  }
  // if(!response.data.details || response.data.details instanceof Error){
  //   if(response.data.details instanceof Error) {
  //      console.log(response.data.details);
  //   }
  //   delete response.data.details;
  // }

  this.res.status(500);
  this.res.jsonx(response);
};
