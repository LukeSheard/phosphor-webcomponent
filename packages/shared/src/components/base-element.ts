import * as debug from "debug";
import { Widget, TabPanel, DockPanel } from "@phosphor/widgets";
import { PhosphorContentWidget } from "./content-widget";
import { HTMLPhosphorWidgetElement } from "./widget";

const log = debug("phosphor:layout:dock");

export type PhosphorLayoutPanel = TabPanel | DockPanel;

export abstract class HTMLPhosphorElement<
  BasePanel extends PhosphorLayoutPanel
> extends HTMLElement {
  protected _layout: BasePanel;
  private _resizeListener: () => void;

  resize() {
    this._layout.fit();
  }

  protected abstract _initLayout(): BasePanel;
  protected abstract addWidget(
    child: HTMLPhosphorWidgetElement
  ): PhosphorContentWidget;

  constructor() {
    super();
    this._layout = this._initLayout();
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
      try {
        Widget.detach(this._layout);
      } catch (e) {
        const ex: Error = e;
        log(ex.message);
      }
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
    return Array.prototype.slice
      .call(this.children)
      .filter((child: Element) => {
        const validTagName =
          child.tagName.toLowerCase() === HTMLPhosphorWidgetElement.is;
        if (!validTagName) {
          console.warn(
            `Removing ${child.tagName}[id=${
              child.id
            }] from phosphor layout because it is not a phosphor-widget`
          );
          child.remove();
        }
        return validTagName;
      });
  }
}
