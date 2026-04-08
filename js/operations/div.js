import { Operation } from "../core/Operation.js";
import { Problem } from "../core/Problem.js";
import { registerOperation } from "../op-loader.js";

class DivOperation extends Operation {

  generate(max) {
    // Generate two numbers between 1 and max (no zeroes)
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;

    // Multiply to get a clean divisible result
    const c = a * b;

    // The problem is c / a = b
    return new Problem(c, a, "/", b);
  }

  getFacts(p) {
    const c = p.a;   // careful: p.a is c
    const a = p.b;   // p.b is the divisor a
    const b = p.result;

    return [
      [a, "*", b, "=", c]   // only the multiplication fact
    ];
  }
}

registerOperation(new DivOperation());

