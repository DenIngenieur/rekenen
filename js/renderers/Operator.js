import { PicElement } from "./PicElement.js";

export class Operator {
  constructor(symbol, heightVar) {
    this.symbol = symbol;
    this.heightVar = heightVar;
  }

  path() {
    switch (this.symbol) {
      case "+": return "pics/symbols/plus.png";
      case "-": return "pics/symbols/min.png";
      case "*": return "pics/symbols/mul.png";
      case "/": return "pics/symbols/div.png";
      case "=": return "pics/symbols/equals.gif";
      default:  return "pics/symbols/slash.png";
    }
  }

  create() {
    return new PicElement(this.path(), this.heightVar).create();
  }
}

