/**
 * 201 (Created) Response
 *
 * The request has been fulfilled and resulted in a new resource being created.
 * Successful creation occurred (via either POST or PUT).
 * Set the Location header to contain a link to the newly-created resource (on POST).
 * Response body content may or may not be present.
 */

module.exports = function created(data, config) {
  const response = Object.assign({
    status: 'success',
    data: data || null,
  }, config);

  this.res.status(201);
  this.res.jsonx(response);
};
