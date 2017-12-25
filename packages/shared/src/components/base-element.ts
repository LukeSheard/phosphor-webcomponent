import { DockPanel, TabPanel, Widget } from "@phosphor/widgets";
import * as debug from "debug";
import { PhosphorContentWidget } from "./content-widget";
import { HTMLPhosphorWidgetElement } from "./widget";

const log = debug("phosphor:layout:dock");

export type PhosphorLayoutPanel = TabPanel | DockPanel;

export abstract class HTMLPhosphorElement<BasePanel extends PhosphorLayoutPanel> extends HTMLElement {
  protected _layout: BasePanel;
  private _resizeListener: () => void;

  constructor() {
    super();
    this._resizeListener = () => this.resize();
    this._layout = this._initLayout();
    this._getChildWidgets().forEach(child => this.addWidget(child));
  }

  public resize() {
    debug(`Resizing ${this}`);
    this._layout.fit();
  }

  public connectedCallback() {
    if (!this._layout.isAttached) {
      Widget.attach(this._layout, this);
    }
    window.addEventListener("resize", this._resizeListener);
    this.resize();
  }

  public disconnectedCallback() {
    window.removeEventListener("resize", this._resizeListener);
  }

  public appendChild(child: any) {
    if (this._layout) {
      const content = this.addWidget(child);
      return content.node;
    }

    return child;
  }

  protected abstract _initLayout(): BasePanel;
  protected abstract addWidget(child: HTMLPhosphorWidgetElement): PhosphorContentWidget;
  protected abstract getWidget(title: string): PhosphorContentWidget | null;

  protected _getChildWidgets(): HTMLPhosphorWidgetElement[] {
    return Array.prototype.slice.call(this.children).filter((child: Element) => {
      const validTagName = child.tagName.toLowerCase() === HTMLPhosphorWidgetElement.is;
      if (!validTagName) {
        log(`Removing ${child.tagName}[id=${child.id}] from phosphor layout because it is not a phosphor-widget`);
        child.remove();
      }
      return validTagName;
    });
  }
}
