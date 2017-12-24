import * as debug from "debug";
import { Widget } from "@phosphor/widgets";

const log = debug("phosphor:layout:widget");

export class HTMLPhosphorWidgetElement extends HTMLElement {
  static get is() {
    return "phosphor-widget";
  }

  public title: string;
  public widget: Widget | null;

  static get observedAttributes(): string[] {
    return ["data-title", "data-closable"];
  }

  public attributeChangedCallback(
    attributeName: string,
    _oldValue: string,
    value: string
  ): void {
    switch (attributeName) {
      case "data-title": {
        this.title = value;
        if (this.widget) {
          this.widget.title.label = this.title;
        }
        break;
      }
      case "data-closable": {
        if (this.widget && (value === "true" || value === "false")) {
          this.widget.title.closable = (value === "true");
        }
        break;
      }
    }
  }

  constructor() {
    super();
    this.widget = null;
    this.title = this.getAttribute("data-title") as string;
  }

  resize() {
    log(`${this.title}: Resize`);
    if (this.firstChild && (this.firstChild as any).resize) {
      (this.firstChild as any).resize();
    }
  }
}

customElements.define(HTMLPhosphorWidgetElement.is, HTMLPhosphorWidgetElement);
