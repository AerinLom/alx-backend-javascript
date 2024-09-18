const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', function () {
  describe('SUM operation', function () {
    it('should return 6 when inputs are 1.4 and 4.5 for SUM', function () {
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
    });

    it('should return 5 when inputs are 1.2 and 3.7 for SUM', function () {
      assert.strictEqual(calculateNumber('SUM', 1.2, 3.7), 5);
    });
  });

  describe('SUBTRACT operation', function () {
    it('should return -4 when inputs are 1.4 and 4.5 for SUBTRACT', function () {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
    });

    it('should return -1 when inputs are 1.7 and 3.3 for SUBTRACT', function () {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.7, 3.3), -1);
    });
  });

  describe('DIVIDE operation', function () {
    it('should return 0.2 when inputs are 1.4 and 4.5 for DIVIDE', function () {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
    });

    it('should return Error when attempting to divide by 0', function () {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
    });
  });

  describe('Invalid operation type', function () {
    it('should return Invalid operation for an unrecognized type', function () {
      assert.strictEqual(calculateNumber('MULTIPLY', 1.4, 4.5), 'Invalid operation');
    });
  });
});
