export class HTMLPhosphorWidgetElement extends HTMLElement {
  
  static get is() {
    return "phosphor-widget";
  }

  resize() {
    console.log("Resize");
    if(this.firstChild && (this.firstChild as any).resize) {
      (this.firstChild as any).resize();
    }
  }
}

customElements.define(HTMLPhosphorWidgetElement.is, HTMLPhosphorWidgetElement);
