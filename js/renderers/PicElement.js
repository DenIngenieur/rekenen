export class PicElement {
  constructor(src, heightVar) {
    this.src = src;
    this.heightVar = heightVar;
  }

  create() {
    const img = document.createElement("img");
    img.src = this.src;
    img.style.height = `var(${this.heightVar})`;
    return img;
  }
}

