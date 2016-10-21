"use strict";

const assert = require('chai').assert;
const sinon = require('sinon');
const ok = require('../../../api/responses/ok');

const context = {
  res: {
    status: sinon.spy(),
    jsonx: sinon.spy()
  }
};

describe('responses:ok', () => {
  it('Should generate response with no params', () => {
    ok.call(context);
    assert.ok(context.res.status.calledWith(200));
    assert.ok(context.res.jsonx.calledWith({
      status: 'success',
      data: null
    }));
  });

  it('Should generate response with data param', () => {
    ok.call(context, {test: 'test'});
    assert.ok(context.res.status.calledWith(200));
    assert.ok(context.res.jsonx.calledWith({
      status: 'success',
      data: {test: 'test' }
    }));
  });

  it('Should generate response with config param', () => {
    ok.call(context, {test: 'test'}, {data: {test: 'test1'}});
    assert.ok(context.res.status.calledWith(200));
    assert.ok(context.res.jsonx.calledWith({
      status: 'success',
      data: { test: 'test1' }
    }));
  });
});
