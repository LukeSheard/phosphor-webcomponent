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

  private _layout: DockPanel;
  private _resizeListener: () => void;

  static get observedAttributes(): ObservedAttribute[] {
    return [
      "data-spacing"
    ];
  }

  resize() {
    this._layout.fit();
  }

  createdCallback() {
    this._layout = new DockPanel({ spacing: parseFloat(this.getAttribute("data-spacing") || "5") });
    
    Array.prototype.slice.call(this.children).forEach((child: Element) => {
      if (child.tagName !== "PHOSPHOR-WIDGET") {
        console.warn(`Removing ${child.tagName}[id=${child.id}] from phosphor layout because it is not a phosphor-widget`);
        child.remove();
      }
    });
    const widgets = Array.prototype.slice.call(this.children);
    console.log(widgets);
    for(let i = 0, l = widgets.length; i < l; i += 1) {
      const child = widgets[i];
      const content = new Content(child);
      this._layout.addWidget(content, {
        mode: child.getAttribute("data-mode") || `split-${i % 2 ? "right" : "bottom"}`
      });
    }
  }

  connectedCallback() {
    Widget.attach(this._layout, this);
    this._resizeListener = () => this.resize();
    window.addEventListener("resize", this._resizeListener);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this._resizeListener);
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

  /**
   * Get the layout configuration for this DockPanel
   */
  saveLayout(): DockPanel.ILayoutConfig {
    return this._layout.saveLayout();
  }

  /**
   * Restore the configuration for this DockPanel
   */
  restoreLayout(layout: DockPanel.ILayoutConfig): void {
    return this._layout.restoreLayout(layout);
  }
}

export const HTMLDockLayoutElement = customElements.define(DockLayoutElement.is, DockLayoutElement)