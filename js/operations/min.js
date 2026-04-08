import { Operation } from "../core/Operation.js";
import { Problem } from "../core/Problem.js";
import { registerOperation } from "../op-loader.js";

class MinOperation extends Operation {

  generate(max) {
    // Generate two independent numbers
    let a = Math.floor(Math.random() * (max + 1));
    let b = Math.floor(Math.random() * (max + 1));

    // Ensure a >= b (no negative results)
    if (a < b) {
      [a, b] = [b, a];
    }

    return new Problem(a, b, "-", a - b);
  }

  getFacts(p) {
    const a = p.a;
    const b = p.b;
    const c = p.result;

    return [
      [c, "+", b, "=", a]   // inverse addition
    ];
  }
}

registerOperation(new MinOperation());

