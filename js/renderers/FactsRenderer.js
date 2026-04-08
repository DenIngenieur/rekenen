import { BaseRenderer } from "./BaseRenderer.js";
import { Operant } from "./Operant.js";
import { Operator } from "./Operator.js";

export class FactsRenderer extends BaseRenderer {
  render(rows) {
    this.clear();

    rows.forEach(parts => {
      const row = document.createElement("div");
      row.className = "fact-row";

      parts.forEach(part => {
        if (typeof part === "number") {
          row.appendChild(new Operant(part, "--facts-number-height").create());
        } else {
          row.appendChild(new Operator(part, "--facts-symbol-height").create());
        }
      });

      this.container.appendChild(row);
    });
  }
}

