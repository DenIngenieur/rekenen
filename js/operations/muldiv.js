import { Operation } from "../core/Operation.js";
import { Problem } from "../core/Problem.js";
import { registerOperation } from "../op-loader.js";

class MulDivOperation extends Operation {

  generate(max) {
    const isMul = Math.random() < 0.5;

    // Generate two numbers between 1 and max (no zeroes)
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;

    if (isMul) {
      // Multiplication problem: a * b = c
      return new Problem(a, b, "*", a * b);
    } else {
      // Division problem: c / a = b
      const c = a * b;
      return new Problem(c, a, "/", b);
    }
  }

  getFacts(p) {
    const a = p.a;
    const b = p.b;
    const c = p.result;

    if (p.operator === "*") {
      // Multiplication facts
      return [
        [b, "*", a, "=", c],  // commutativity
        [c, "/", a, "=", b],  // inverse division
        [c, "/", b, "=", a]   // inverse division
      ];
    } else {
      // Division facts (only the multiplication fact)
      // p.a is c, p.b is a, p.result is b
      const c = p.a;
      const a = p.b;
      const b = p.result;

      return [
        [a, "*", b, "=", c]
      ];
    }
  }
}

registerOperation(new MulDivOperation());

