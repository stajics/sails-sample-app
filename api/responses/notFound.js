"use strict";

/**
 * 404 (Not Found) Response
 *
 * The requested resource could not be found but may be available again in the future.
 * Subsequent requests by the client are permissible.
 * Used when the requested resource is not found, whether it doesn't exist.
 */

 module.exports = function (data, config) {

   const response = Object.assign({
     status: 'fail',
     data: data || {
        message: 'The requested resource could not be found but may be available again in the future.'
     }
   }, config);

   this.res.status(404);
   this.res.jsonx(response);
 };
