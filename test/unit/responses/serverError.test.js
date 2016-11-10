/* eslint import/no-extraneous-dependencies: 'off' */
const assert = require('chai').assert;
const sinon = require('sinon');
const serverError = require('../../../api/responses/serverError');

const context = {
  res: {
    status: sinon.spy(),
    jsonx: sinon.spy(),
  },
};

describe('responses:serverError', () => {
  it('Should generate response with no params', () => {
    serverError.call(context);
    assert.ok(context.res.status.calledWith(500));
    assert.ok(context.res.jsonx.calledWith({
      status: 'error',
      message: 'Something bad happened on the server.',
      data: 'undefined',
    }));
  });

  it('Should generate response with data param', () => {
    serverError.call(context, { test: 'test' });
    assert.ok(context.res.status.calledWith(500));
    assert.ok(context.res.jsonx.calledWith({
      status: 'error',
      message: 'Something bad happened on the server.',
      data: '{ test: \'test\' }',
    }));
  });

  it('Should generate response with config param', () => {
    serverError.call(context, { test: 'test' }, { data: { test: 'test1' } });
    assert.ok(context.res.status.calledWith(500));
    assert.ok(context.res.jsonx.calledWith({
      status: 'error',
      message: 'Something bad happened on the server.',
      data: { test: 'test1' },
    }));
  });
});
