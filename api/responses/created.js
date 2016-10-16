"use strict";

/**
 * 201 (Created) Response
 *
 * The request has been fulfilled and resulted in a new resource being created.
 * Successful creation occurred (via either POST or PUT).
 * Set the Location header to contain a link to the newly-created resource (on POST).
 * Response body content may or may not be present.
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

  this.res.status(201);
  this.res.jsonx(response);
};
