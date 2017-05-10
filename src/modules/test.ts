export default class Test {
  private _name: string;
  constructor (name: string) {
    this._name = name;
  }

  say () {
    console.log(`My name is ${this._name}.`);
  }
}
