"use strict";

/**
 * 400 (Bad Request) Response
 *
 * The request cannot be fulfilled due to bad syntax.
 * General error when fulfilling the request would cause an invalid state.
 * Domain validation errors, missing data, etc.
 */

 module.exports = function (data, config) {
   console.log(data);

   const response = Object.assign({
     status: 'fail',
     data: data || null
   }, config);

   this.res.status(400);
   this.res.jsonx(response);
 };
