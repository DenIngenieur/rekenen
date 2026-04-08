import { BaseRenderer } from "./BaseRenderer.js";
import { Operant } from "./Operant.js";
import { Operator } from "./Operator.js";
import { PicElement } from "./PicElement.js";

export class SolutionRenderer extends BaseRenderer {
  render(a, operator, b, equals, result) {
    this.clear();

    const row = this.row();

    row.appendChild(new Operant(a, "--number-height").create());
    row.appendChild(new Operator(operator, "--symbol-height").create());
    row.appendChild(new Operant(b, "--number-height").create());
    row.appendChild(new Operator(equals, "--symbol-height").create());
    row.appendChild(new Operant(result, "--number-height").create());

    this.container.appendChild(row);
  }

  renderFinalScore(score, total) {
    this.clear();

    const row = this.row();

    row.appendChild(new Operant(score, "--number-height").create());
    row.appendChild(new PicElement("pics/symbols/slash.png", "--number-height").create());
    row.appendChild(new Operant(total, "--number-height").create());

    this.container.appendChild(row);
  }
}

