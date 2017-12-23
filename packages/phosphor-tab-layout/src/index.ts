import { TabPanel, Widget } from "@phosphor/widgets";

class Content extends Widget {
  constructor(node: Element) {
    super();
    this.title.label = node.getAttribute("data-title") || "UNKNOWN";
    this.node.appendChild(node);
  }

  onResize() {
    (this.node.firstChild as any).resize();
  }
}

export class TabLayoutElement extends HTMLElement {
  
  static get is() {
    return "phosphor-tab-layout";
  }

  private _layout: TabPanel;
  private _resizeListener: () => void;

  resize() {
    this._layout.fit();
  }

  constructor() {
    super();
    this._layout = new TabPanel();
    
    Array.prototype.slice.call(this.children).forEach((child: Element) => {
      if (child.tagName !== "PHOSPHOR-WIDGET") {
        console.warn(`Removing ${child.tagName}[id=${child.id}] from phosphor layout because it is not a phosphor-widget`);
        child.remove();
      }
    });
    const widgets = Array.prototype.slice.call(this.children);
    for(let i = 0, l = widgets.length; i < l; i += 1) {
      const child = widgets[i];
      const content = new Content(child);
      this._layout.addWidget(content);
    }
  }

  connectedCallback() {
    if (!this._layout.isAttached) {
      Widget.attach(this._layout, this);
      this._resizeListener = () => this.resize();
      window.addEventListener("resize", this._resizeListener);
    }
    this.resize();
    console.log("TAB ATTACH");
  }
  
  disconnectedCallback() {
    if (this._layout.isAttached) {
      window.removeEventListener("resize", this._resizeListener);
      Widget.detach(this._layout);
    }
    console.log("TAB DETACH");
  }

  appendChild(child: any) {
    if (this._layout) {
      const content = new Content(child);
      this._layout.addWidget(content);
      return content.node;
    }

    return child;
  }
}

export const HTMLTabLayoutElement = customElements.define(TabLayoutElement.is, TabLayoutElement);