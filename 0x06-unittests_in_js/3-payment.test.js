const sinon = require('sinon');
const assert = require('assert');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', function () {
  let spy;

  beforeEach(function () {
    spy = sinon.spy(Utils, 'calculateNumber');
  });

  afterEach(function () {
    spy.restore();
  });

  it('should call Utils.calculateNumber with "SUM" and the correct arguments', function () {
    sendPaymentRequestToApi(100, 20);

    assert(spy.calledWith('SUM', 100, 20));
  });
});
