export const REQUIRED_ATTRIBUTES = [
  "data-title"
];

export class PhosphorWidget extends HTMLElement {
  
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
}

export default customElements.define(PhosphorWidget.is, PhosphorWidget);
