const sinon = require('sinon');
const assert = require('assert');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', function () {
  let stub;
  let spy;

  beforeEach(function () {
    stub = sinon.stub(Utils, 'calculateNumber').returns(10);
    
    spy = sinon.spy(console, 'log');
  });

  afterEach(function () {
    stub.restore();
    spy.restore();
  });

  it('should call Utils.calculateNumber with "SUM" and the correct arguments', function () {
    sendPaymentRequestToApi(100, 20);
    
    assert(stub.calledWith('SUM', 100, 20));
  });

  it('should log the correct message', function () {
    sendPaymentRequestToApi(100, 20);
    
    assert(spy.calledWith('The total is: 10'));
  });
});
