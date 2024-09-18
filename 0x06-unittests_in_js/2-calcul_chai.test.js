const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
  describe('type == "SUM"', () => {
    it('should return the sum of two rounded numbers', () => {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
    });

    it('should handle negative numbers for sum', () => {
      expect(calculateNumber('SUM', -1.6, -2.3)).to.equal(-4);
    });

    it('should round and sum floating point numbers', () => {
      expect(calculateNumber('SUM', 2.6, 1.3)).to.equal(4);
    });

    it('should work with large numbers for sum', () => {
      expect(calculateNumber('SUM', 1000.7, 2000.2)).to.equal(3001);
    });
  });

  describe('type == "SUBTRACT"', () => {
    it('should return the difference of two rounded numbers', () => {
      expect(calculateNumber('SUBTRACT', 5.7, 2.1)).to.equal(4);
    });

    it('should handle negative numbers for subtraction', () => {
      expect(calculateNumber('SUBTRACT', -5.8, -2.2)).to.equal(-4);
    });

    it('should round and subtract floating point numbers', () => {
      expect(calculateNumber('SUBTRACT', 8.6, 1.2)).to.equal(8);
    });

    it('should work with large numbers for subtraction', () => {
      expect(calculateNumber('SUBTRACT', 5000.9, 2000.4)).to.equal(3001);
    });
  });

  describe('type == "DIVIDE"', () => {
    it('should return the quotient of two rounded numbers', () => {
      expect(calculateNumber('DIVIDE', 9.6, 2.2)).to.equal(5);
    });

    it('should return error when dividing by 0', () => {
      expect(calculateNumber('DIVIDE', 5.0, 0)).to.equal('Error');
    });

    it('should handle negative numbers for division', () => {
      expect(calculateNumber('DIVIDE', -9.3, 2.7)).to.equal(-3);
    });

    it('should return positive result for dividing two negative numbers', () => {
      expect(calculateNumber('DIVIDE', -7.6, -2.4)).to.equal(4);
    });
  });
});
