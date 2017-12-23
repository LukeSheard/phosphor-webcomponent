import { Widget, TabPanel, DockPanel } from "@phosphor/widgets";
import { PhosphorContentWidget } from "./content-widget";
import { HTMLPhosphorWidgetElement } from "./widget";

export type PhosphorLayoutPanel = TabPanel | DockPanel;

export class HTMLPhosphorElement<BasePanel extends PhosphorLayoutPanel> extends HTMLElement {
  protected _layout: BasePanel;
  private _resizeListener: () => void;

  resize() {
    this._layout.fit();
  }

  protected _initLayout() {
    throw Error("Must be implemented in subclas");
  }

  protected addWidget(child: HTMLPhosphorWidgetElement): PhosphorContentWidget {
    throw Error("Must be implemented in subclass");
  }

  constructor() {
    super();
    this._initLayout();
    
    this._getChildWidgets().forEach(child => this.addWidget(child));
  }

  public connectedCallback() {
    if (!this._layout.isAttached) {
      Widget.attach(this._layout, this);
      this._resizeListener = () => this.resize();
      window.addEventListener("resize", this._resizeListener);
    }
    this.resize();
  }
  
  public disconnectedCallback() {
    if (this._layout.isAttached) {
      window.removeEventListener("resize", this._resizeListener);
      Widget.detach(this._layout);
    }
  }

  public appendChild(child: any) {
    if (this._layout) {
      const content = this.addWidget(child);
      return content.node;
    }

    return child;
  }

  private _getChildWidgets(): HTMLPhosphorWidgetElement[] {
    return Array.prototype.slice.call(this.children).filter((child: Element) => {
      const validTagName = child.tagName !== "PHOSPHOR-WIDGET";
      if (!validTagName) {
        console.warn(`Removing ${child.tagName}[id=${child.id}] from phosphor layout because it is not a phosphor-widget`);
        child.remove();
      }
      return validTagName;
    });
  }
}