"use strict";

/**
 * 500 (Internal Server Error) Response
 *
 * A generic error message, given when no more specific message is suitable.
 * The general catch-all error when the server-side throws an exception.
 */

 module.exports = function (data, config) {
   console.log("AAAA");

   const response = Object.assign({
     status: 'error',
     message: 'Something bad happened on the server.',
     data: data || null
   }, config);

   this.res.status(500);
   this.res.jsonx(response);
 };