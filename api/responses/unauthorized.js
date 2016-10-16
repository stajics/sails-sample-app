"use strict";

/**
 * 401 (Unauthorized) Response
 *
 * Similar to 403 Forbidden.
 * Specifically for use when authentication is possible but has failed or not yet been provided.
 * Error code response for missing or invalid authentication token.
 */

const _ = require('lodash');

module.exports = function (data, config) {
  const response = _.assign({
    status: _.get(config, 'status', 'fail'),
    data: {message: _.get(config, 'message', 'Missing or invalid authentication token'), details: _.get(config, 'details', data)}
  }, _.get(config, 'root', {}));

  if(_.isEmpty(response.data.details)) {
    delete response.data.details;
  }
  //
  // if(!response.data.details || response.data.details instanceof Error){
  //   if(response.data.details instanceof Error) {
  //      console.log(response.data.details);
  //   }
  //   delete response.data.details;
  // }

  this.res.status(401);
  this.res.jsonx(response);
};
