import { DockPanel, Widget } from "@phosphor/widgets";
import { PhosphorContentWidget } from "@phosphorwc/shared";
import "./index.css";

export class DockLayoutElement extends HTMLElement {
  
  static get is() {
    return "phosphor-dock-layout";
  }

  private _layout: DockPanel;
  private _resizeListener: () => void;

  static get observedAttributes(): string[] {
    return [
      "data-spacing"
    ];
  }

  resize() {
    this._layout.fit();
  }

  constructor() {
    super();
    this._layout = new DockPanel({ spacing: parseFloat(this.getAttribute("data-spacing") || "5") });
    
    Array.prototype.slice.call(this.children).forEach((child: Element) => {
      if (child.tagName.toLowerCase() !== "phosphor-widget") {
        console.warn(`Removing ${child.tagName}[id=${child.id}] from phosphor layout because it is not a phosphor-widget`);
        child.remove();
      }
    });
    const widgets = Array.prototype.slice.call(this.children);
    for(let i = 0, l = widgets.length; i < l; i += 1) {
      const child = widgets[i];
      const content = new PhosphorContentWidget(child);
      this._layout.addWidget(content, {
        mode: child.getAttribute("data-split-mode") || `split-${i % 2 ? "right" : "bottom"}`
      });
    }
  }

  connectedCallback() {
    if (!this._layout.isAttached) {
      Widget.attach(this._layout, this);
      this._resizeListener = () => this.resize();
      window.addEventListener("resize", this._resizeListener);
    }
    this._layout.fit();
    this._layout.update();
  }
  
  disconnectedCallback() {
    if (this._layout.isAttached) {
      window.removeEventListener("resize", this._resizeListener);
    }
  }

  appendChild(child: any) {
    if (this._layout) {
      const content = new PhosphorContentWidget(child);
      this._layout.addWidget(content);
      return content.node;
    }

    return child;
  }

  attributeChangedCallback(attr: string, _: string, newValue: string) {
    switch (attr) {
      case "data-spacing": {
        if (newValue && this._layout) {
          try {
            const spacing = parseFloat(newValue);
            this._layout.spacing = spacing
          } catch (e) {
            console.warn(e);
          }
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