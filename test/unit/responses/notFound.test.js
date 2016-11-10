/* eslint import/no-extraneous-dependencies: 'off' */
const assert = require('chai').assert;
const sinon = require('sinon');
const notFound = require('../../../api/responses/notFound');

const context = {
  res: {
    status: sinon.spy(),
    jsonx: sinon.spy(),
  },
};

describe('responses:notFound', () => {
  it('Should generate response with no params', () => {
    notFound.call(context);
    assert.ok(context.res.status.calledWith(404));
    assert.ok(context.res.jsonx.calledWith({
      status: 'fail',
      data: { message: 'The requested resource could not be found but may be available again in the future.' },
    }));
  });

  it('Should generate response with data param', () => {
    notFound.call(context, { message: 'test' });
    assert.ok(context.res.status.calledWith(404));
    assert.ok(context.res.jsonx.calledWith({
      status: 'fail',
      data: { message: 'test' },
    }));
  });

  it('Should generate response with config param', () => {
    notFound.call(context, { message: 'test' }, { data: { message: 'test1' } });
    assert.ok(context.res.status.calledWith(404));
    assert.ok(context.res.jsonx.calledWith({
      status: 'fail',
      data: { message: 'test1' },
    }));
  });
});
