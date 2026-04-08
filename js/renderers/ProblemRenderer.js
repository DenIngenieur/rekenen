import { BaseRenderer } from "./BaseRenderer.js";
import { Operant } from "./Operant.js";
import { Operator } from "./Operator.js";

export class ProblemRenderer extends BaseRenderer {
  render(a, operator, b, equals, resultOrNull) {
    this.clear();

    const row = this.row();

    row.appendChild(new Operant(a, "--number-height").create());
    row.appendChild(new Operator(operator, "--symbol-height").create());
    row.appendChild(new Operant(b, "--number-height").create());
    row.appendChild(new Operator(equals, "--symbol-height").create());

    if (resultOrNull !== null) {
      row.appendChild(new Operant(resultOrNull, "--number-height").create());
    }

    this.container.appendChild(row);
  }
}

