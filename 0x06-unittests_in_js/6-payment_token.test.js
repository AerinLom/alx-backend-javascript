const { expect } = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', () => {
  it('getPaymentTokenFromAPI(success), where success == true', (done) => {
    getPaymentTokenFromAPI(true)
      .then((res) => {
        expect(res).to.deep.equal({ data: 'Successful response from the API' });
        done();
      })
      .catch((err) => done(err));
  });

  it('getPaymentTokenFromAPI(success), where success == false', (done) => {
    const result = getPaymentTokenFromAPI(false);
    expect(result).to.be.undefined;
    done();
  });
});
