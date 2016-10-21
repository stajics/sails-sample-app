"use strict";

const assert = require('chai').assert;
const sinon = require('sinon');
const badRequest = require('../../../api/responses/badRequest');

const context = {
  res: {
    status: sinon.spy(),
    jsonx: sinon.spy()
  }
};

describe('responses:badRequest', () => {
  it('Should generate response with no params', () => {
    badRequest.call(context);
    assert.ok(context.res.status.calledWith(400));
    assert.ok(context.res.jsonx.calledWith({
      status: 'fail',
      data: 'undefined'
    }));
  });

  it('Should generate response with data param', () => {
    badRequest.call(context, {test: 'test'});
    assert.ok(context.res.status.calledWith(400));
    assert.ok(context.res.jsonx.calledWith({
      status: 'fail',
      data: '{ test: \'test\' }'
    }));
  });

  it('Should generate response with config param', () => {
    badRequest.call(context, {test: 'test'}, {data: {test: 'test1'}});
    assert.ok(context.res.status.calledWith(400));
    assert.ok(context.res.jsonx.calledWith({
      status: 'fail',
      data: { test: 'test1' }
    }));
  });
});
