"use strict";

/**
 * 404 (Not Found) Response
 *
 * The requested resource could not be found but may be available again in the future.
 * Subsequent requests by the client are permissible.
 * Used when the requested resource is not found, whether it doesn't exist.
 */

const _ = require('lodash');

module.exports = function (data, config) {
  const response = _.assign({
    status: _.get(config, 'status', 'fail'),
    data: {message: _.get(config, 'message', 'The requested resource could not be found but may be available again in the future'), details: data}
  }, _.get(config, 'root', {}));

  // if(!response.data.details || response.data.details instanceof Error){
  //   if(response.data.details instanceof Error) {
  //      console.log(response.data.details);
  //   }
  //   delete response.data.details;
  // }

  this.res.status(404);
  this.res.jsonx(response);
};
