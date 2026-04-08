import { PicElement } from "./PicElement.js";

export class Operant {
  constructor(value, heightVar) {
    this.value = value;
    this.heightVar = heightVar;
  }

  create() {
    const wrapper = document.createElement("div");
    wrapper.className = "render-number";

    String(this.value).split("").forEach(d => {
      const img = new PicElement(`pics/numbers/${d}.png`, this.heightVar).create();
      wrapper.appendChild(img);
    });

    return wrapper;
  }
}

