const REQUIRED_ATTRIBUTES = [
  "data-title"
];

export class HTMLPhosphorWidgetElement extends HTMLElement {
  
  static get is() {
    return "phosphor-widget";
  }

  connectedCallback() {
    REQUIRED_ATTRIBUTES.forEach((attrName) => {
      if (!this.hasAttribute(attrName)) {
        console.warn(`Removing ${this.tagName}[id=${this.id || this.getAttribute("data-title") || "UNKNOWN"}] becuase ${attrName} is not present`);
        this.remove();
      }
    })
  }

  resize() {
    console.log("Resize");
    if(this.firstChild && (this.firstChild as any).resize) {
      (this.firstChild as any).resize();
    }
  }
}

customElements.define(HTMLPhosphorWidgetElement.is, HTMLPhosphorWidgetElement);
