/* eslint import/no-extraneous-dependencies: 'off' */
const assert = require('chai').assert;
const sinon = require('sinon');
const unauthorized = require('../../../api/responses/unauthorized');

const context = {
  res: {
    status: sinon.spy(),
    jsonx: sinon.spy(),
  },
};

describe('responses:unauthorized', () => {
  it('Should generate response with no params', () => {
    unauthorized.call(context);
    assert.ok(context.res.status.calledWith(401));
    assert.ok(context.res.jsonx.calledWith({
      status: 'fail',
      data: null,
    }));
  });

  it('Should generate response with data param', () => {
    unauthorized.call(context, { test: 'test' });
    assert.ok(context.res.status.calledWith(401));
    assert.ok(context.res.jsonx.calledWith({
      status: 'fail',
      data: { test: 'test' },
    }));
  });

  it('Should generate response with config param', () => {
    unauthorized.call(context, { test: 'test' }, { data: { test: 'test1' } });
    assert.ok(context.res.status.calledWith(401));
    assert.ok(context.res.jsonx.calledWith({
      status: 'fail',
      data: { test: 'test1' },
    }));
  });
});
