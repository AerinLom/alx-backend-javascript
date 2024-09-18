// 5-payment.test.js
const sinon = require('sinon');
const assert = require('assert');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', function () {
  let spy;

  beforeEach(function () {
    spy = sinon.spy(console, 'log');
  });

  afterEach(function () {
    spy.restore();
  });

  it('should log the correct message when called with 100 and 20', function () {
    sendPaymentRequestToApi(100, 20);
    
    assert(spy.calledWith('The total is: 120'));
    assert(spy.calledOnce);
  });

  it('should log the correct message when called with 10 and 10', function () {
    sendPaymentRequestToApi(10, 10);
    
    assert(spy.calledWith('The total is: 20'));
    assert(spy.calledOnce);
  });
});
