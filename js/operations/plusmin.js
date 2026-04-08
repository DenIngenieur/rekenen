import { Operation } from "../core/Operation.js";
import { Problem } from "../core/Problem.js";
import { registerOperation } from "../op-loader.js";

class PlusMinOperation extends Operation {

  generate(max) {
    // Randomly choose + or -
    const isPlus = Math.random() < 0.5;

    let a = Math.floor(Math.random() * (max + 1));
    let b = Math.floor(Math.random() * (max + 1));

    if (isPlus) {
      // Addition
      return new Problem(a, b, "+", a + b);
    } else {
      // Subtraction: ensure a >= b
      if (a < b) {
        [a, b] = [b, a];
      }
      return new Problem(a, b, "-", a - b);
    }
  }

  getFacts(p) {
    const a = p.a;
    const b = p.b;
    const c = p.result;

    if (p.operator === "+") {
      // Addition facts: commutativity + inverse subtraction
      return [
        [b, "+", a, "=", c],  // commutativity
        [c, "-", a, "=", b],  // inverse subtraction
        [c, "-", b, "=", a]   // inverse subtraction
      ];
    } else {
      // Subtraction facts: only the clean inverse addition
      return [
        [c, "+", b, "=", a]
      ];
    }
  }
}

registerOperation(new PlusMinOperation());

