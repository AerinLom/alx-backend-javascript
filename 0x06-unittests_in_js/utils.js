const Utils = {
  calculateNumber: function(type, a, b) {
    a = Math.round(a);
    b = Math.round(b);
    if (type === 'SUM') return a + b;
    if (type === 'SUBTRACT') return a - b;
    if (type === 'DIVIDE') {
      if (b === 0) return 'Error';
      return a / b;
    }
    return 'Invalid operation';
  }
};

module.exports = Utils;
