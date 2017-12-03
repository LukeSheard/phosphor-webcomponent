import { DockPanel, Widget } from "@phosphor/widgets";

class Content extends Widget {
  constructor(node: Element) {
    super();
    this.title.label = node.getAttribute("data-title") || "UNKNOWN";
    this.node.appendChild(node);
  }
}

type ObservedAttribute = 'data-spacing';

export class DockLayoutElement extends HTMLElement {
  
  static get is() {
    return "phosphor-dock-layout";
  }

  private _layout: DockPanel | null;

  static get observedAttributes(): ObservedAttribute[] {
    return [
      "data-spacing"
    ];
  }

  connectedCallback() {
    this._layout = new DockPanel({ spacing: parseFloat(this.getAttribute("data-spacing") || "5") });

    Array.prototype.slice.call(this.children).forEach((child: Element) => {
      if (child.tagName !== "PHOSPHOR-WIDGET") {
        console.warn(`Removing ${child.tagName}[id=${child.id}] from phosphor layout because it is not a phosphor-widget`);
        child.remove();
      }
    });
    console.log(">>>>>>>>>", this.children);
    const widgets = Array.prototype.slice.call(this.children);
    for(let i = 0, l = widgets.length; i < l; i += 1) {
      const child = widgets[i];
      const content = new Content(child);
      this._layout.addWidget(content, {
        mode: child.getAttribute("data-mode") || `split-${Math.random() > 0.5 ? "right" : "bottom"}`
      });
    }
    Widget.attach(this._layout, this);
  }

  disconnectedCallback() {
    if (this._layout) {
      Widget.detach(this._layout);
      this._layout = null;
    }
  }

  appendChild(child: any) {
    if (this._layout) {
      const content = new Content(child);
      this._layout.addWidget(content);
      return content.node;
    }

    return child;
  }

  attributeChangedCallback(attr: ObservedAttribute, _: string, newValue: string) {
    switch (attr) {
      case "data-spacing": {
        if (newValue && this._layout) {
          this._layout.spacing = parseFloat(newValue)
        }
      }
    }
  }
}

export default customElements.define(DockLayoutElement.is, DockLayoutElement)