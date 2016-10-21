"use strict";

/**
 * 401 (Unauthorized) Response
 *
 * Similar to 403 Forbidden.
 * Specifically for use when authentication is possible but has failed or not yet been provided.
 * Error code response for missing or invalid authentication token.
 */

 module.exports = function (data, config) { //TODO adjust response to signin without params to meet JSend
   if(sails.config.log.consoleLogErrorResponses){
     console.log(data);
   }

   const response = Object.assign({
     status: 'fail',
     data: data || null
   }, config);
   
   this.res.status(401);
   this.res.jsonx(response);
 };
