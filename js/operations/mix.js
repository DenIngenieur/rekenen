import { Operation } from "../core/Operation.js";
import { Problem } from "../core/Problem.js";
import { registerOperation } from "../op-loader.js";

class MixOperation extends Operation {

  generate(max) {
    // Pick one of the four operations
    const ops = ["+", "-", "*", "/"];
    const op = ops[Math.floor(Math.random() * ops.length)];

    let a = Math.floor(Math.random() * (max + 1));
    let b = Math.floor(Math.random() * (max + 1));

    switch (op) {

      case "+":
        return new Problem(a, b, "+", a + b);

      case "-":
        // ensure a >= b
        if (a < b) [a, b] = [b, a];
        return new Problem(a, b, "-", a - b);

      case "*":
        // no zeroes
        a = Math.floor(Math.random() * max) + 1;
        b = Math.floor(Math.random() * max) + 1;
        return new Problem(a, b, "*", a * b);

      case "/":
        // no zeroes, clean division
        a = Math.floor(Math.random() * max) + 1;
        b = Math.floor(Math.random() * max) + 1;
        const c = a * b;
        return new Problem(c, a, "/", b);
    }
  }

  getFacts(p) {
    const a = p.a;
    const b = p.b;
    const c = p.result;

    switch (p.operator) {

      case "+":
        return [
          [b, "+", a, "=", c],
          [c, "-", a, "=", b],
          [c, "-", b, "=", a]
        ];

      case "-":
        return [
          [c, "+", b, "=", a]
        ];

      case "*":
        return [
          [b, "*", a, "=", c],
          [c, "/", a, "=", b],
          [c, "/", b, "=", a]
        ];

      case "/":
        // p.a = c, p.b = a, p.result = b
        return [
          [p.b, "*", p.result, "=", p.a]
        ];
    }
  }
}

registerOperation(new MixOperation());

