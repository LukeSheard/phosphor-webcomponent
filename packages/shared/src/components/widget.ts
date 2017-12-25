import { Widget } from "@phosphor/widgets";
import * as debug from "debug";
import { HTMLPhosphorElement } from "./base-element";

const log = debug("phosphor:layout:widget");

const PHOSPHOR_TAGS = ["phosphor-dock-layout", "phosphor-tab-layout"];

function resize(children: HTMLCollection) {
  for (let i = 0, l = children.length; i < l; i += 1) {
    const child: Element = children[i];
    if (PHOSPHOR_TAGS.indexOf(child.tagName.toLowerCase()) > -1) {
      log(`Resizing ${child}`);
      (child as HTMLPhosphorElement<any>).resize();
    } else {
      resize(child.children);
    }
  }
}

export class HTMLPhosphorWidgetElement extends HTMLElement {
  static get is() {
    return "phosphor-widget";
  }

  public title: string;
  public widget: Widget | null;

  static get observedAttributes(): string[] {
    return ["data-title", "data-closable"];
  }

  constructor() {
    super();
    this.widget = null;
    this.title = this.getAttribute("data-title") as string;
  }

  public attributeChangedCallback(attributeName: string, _: string, value: string): void {
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
          this.widget.title.closable = value === "true";
        }
        break;
      }
    }
  }

  public resize() {
    log(`${this.title}: Resize`);
    resize(this.children);
    this.dispatchEvent(new CustomEvent("resize"));
  }

  public remove(): void {
    if (this.widget) {
      this.widget.parent = null;
      this.dispatchEvent(new CustomEvent("remove"));
    } else {
      log(`${this} is not attached, cannot be removed from layout`);
    }
  }

  public toString(): string {
    return `<phosphor-widget "${this.getAttribute("data-title")}" />`;
  }
}

customElements.define(HTMLPhosphorWidgetElement.is, HTMLPhosphorWidgetElement);
