"use strict";
const util = require('util');
/**
 * 400 (Bad Request) Response
 *
 * The request cannot be fulfilled due to bad syntax.
 * General error when fulfilling the request would cause an invalid state.
 * Domain validation errors, missing data, etc.
 */

 module.exports = function (data, config) {
   if(sails.config.log.consoleLogErrorResponses){
     console.log(data);
   }
   data = util.inspect(data);
   const response = Object.assign({
     status: 'fail',
     data: data || null
   }, config);

   this.res.status(400);
   this.res.jsonx(response);
 };
