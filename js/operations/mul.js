import { Operation } from "../core/Operation.js";
import { Problem } from "../core/Problem.js";
import { registerOperation } from "../op-loader.js";

class MulOperation extends Operation {

  generate(max) {
    // Generate two numbers between 1 and max (no zeroes)
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;

    return new Problem(a, b, "*", a * b);
  }

  getFacts(p) {
    const a = p.a;
    const b = p.b;
    const c = p.result;

    return [
      [b, "*", a, "=", c],   // commutativity
      [c, "/", a, "=", b],   // inverse division
      [c, "/", b, "=", a]    // inverse division
    ];
  }
}

registerOperation(new MulOperation());

