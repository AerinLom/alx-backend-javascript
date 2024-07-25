export default class Building {
  constructor(sqft) {
    this._sqft = sqft;
    console.log(this.#evacuationWarningMessage())
  }

  get sqft() {
    return this._sqft;
  }

  #evacuationWarningMessage(){
    return Error('Class extending Building must override evacuationWarningMessage');
  }
}
