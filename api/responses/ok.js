"use strict";

/**
 * 200 (OK) Response
 *
 * General status code. Most common code used to indicate success.
 * The actual response will depend on the request method used.
 * In a GET request, the response will contain an entity corresponding to the requested resource.
 * In a POST request the response will contain an entity describing or containing the result of the action.
 */

const _ = require('lodash');

module.exports = function (data, config) {
  const response = _.assign({
    status: _.get(config, 'status', 'success'),
    data: data || null
  }, _.get(config, 'root', {}));

  // if(!response.data.details || response.data.details instanceof Error){
  //   if(response.data.details instanceof Error) {
  //      console.log(response.data.details);
  //   }
  //   delete response.data.details;
  // }

  this.res.status(200);
  this.res.jsonx(response);
};
