/**
 * 200 (OK) Response
 *
 * General status code. Most common code used to indicate success.
 * The actual response will depend on the request method used.
 * In a GET request, the response will contain an entity corresponding to the requested resource.
 * In a POST request the response will contain an entity describing or containing the result of the action.
 */

module.exports = function ok(data, config) {
  const response = Object.assign({
    status: 'success',
    data: data || null,
  }, config);

  this.res.status(200);
  this.res.jsonx(response);
};
