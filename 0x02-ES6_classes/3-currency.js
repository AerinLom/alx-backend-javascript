export default class Currency {
  constructor(code, name) {
    this._code = Currency._validateCode(code);
    this._name = Currency._validateName(name);
  }

  static _validateName(name) {
    if (typeof name !== 'string') {
      throw new TypeError('Name must be a string');
    }
    return name;
  }

  static _validateCode(code) {
    if (typeof code !== 'string') {
      throw new TypeError('Code must be a string');
    }
    return code;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = Currency._validateName(name);
  }

  get code() {
    return this._code;
  }

  set code(code) {
    this._code = Currency._validateCode(code);
  }

  displayFullCurrency() {
    return `${this._name} (${this._code})`;
  }
}
