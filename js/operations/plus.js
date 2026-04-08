import { Operation } from "../core/Operation.js";
import { Problem } from "../core/Problem.js";
import { registerOperation } from "../op-loader.js";

class PlusOperation extends Operation {
  generate(max) {
    const a = Math.floor(Math.random() * (max + 1));
    const b = Math.floor(Math.random() * (max + 1));
    return new Problem(a, b, "+", a + b);
  }

  getFacts(p) {
    return [
      [p.b, "+", p.a, "=", p.result],  // commuted version
      [p.result, "-", p.a, "=", p.b],
      [p.result, "-", p.b, "=", p.a]
    ];
  }

}

registerOperation(new PlusOperation());

