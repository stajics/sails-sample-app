"use strict";

const assert = require('chai').assert;
const sinon = require('sinon');
const created = require('../../../api/responses/created');

const context = {
  res: {
    status: sinon.spy(),
    jsonx: sinon.spy()
  }
};

describe('responses:created', () => {
  it('Should generate response with no params', () => {
    created.call(context);
    assert.ok(context.res.status.calledWith(201));
    assert.ok(context.res.jsonx.calledWith({
      status: 'success',
      data: null
    }));
  });

  it('Should generate response with data param', () => {
    created.call(context, {test: 'test'});
    assert.ok(context.res.status.calledWith(201));
    assert.ok(context.res.jsonx.calledWith({
      status: 'success',
      data: {test: 'test' }
    }));
  });

  it('Should generate response with config param', () => {
    created.call(context, {test: 'test'}, {data: {test: 'test1'}});
    assert.ok(context.res.status.calledWith(201));
    assert.ok(context.res.jsonx.calledWith({
      status: 'success',
      data: { test: 'test1' }
    }));
  });
});
