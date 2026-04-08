export class BaseRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  clear() {
    this.container.innerHTML = "";
  }

  row() {
    const div = document.createElement("div");
    div.className = "render-row";
    return div;
  }
}

