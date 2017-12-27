import { TabPanel } from "@phosphor/widgets";
import * as debug from "debug";
import { HTMLPhosphorElement, HTMLPhosphorWidgetElement, PhosphorContentWidget } from "phosphor-layout-shared";

export class HTMLPhosphorTabElement extends HTMLPhosphorElement<TabPanel> {
  static get is() {
    return "phosphor-tab-layout";
  }

  static get observedAttributes(): string[] {
    return ["data-tabs-movable"];
  }

  constructor() {
    super();
    this._layout.currentChanged.connect((_panel: TabPanel, signal: TabPanel.ICurrentChangedArgs) => {
      const widget = signal.currentWidget as PhosphorContentWidget;
      this.dispatchEvent(
        new CustomEvent("tab-change", {
          detail: {
            title: widget.title.label,
            widget: widget.node.firstChild
          }
        })
      );
    });
  }

  public attributeChangedCallback(attr: string, _: string, newValue: string) {
    switch (attr) {
      case "data-tabs-movable": {
        if (this._layout) {
          this._layout.tabsMovable = newValue === "true";
        }
      }
    }
  }

  protected _initLayout() {
    return new TabPanel();
  }

  protected addWidget(child: HTMLPhosphorWidgetElement): PhosphorContentWidget {
    const widget = new PhosphorContentWidget(child);
    this._layout.addWidget(widget);
    return widget;
  }

  protected getWidget(title: string): PhosphorContentWidget | null {
    const matchingWidgets = this._layout.widgets.filter(widget => widget.title.label === title);
    if (matchingWidgets.length) {
      if (matchingWidgets.length > 1) {
        debug(`${this}`)(`Multiple matching widgets with title ${title}`);
      }
      return matchingWidgets[0] as PhosphorContentWidget;
    }
    return null;
  }

  get currentTabName(): string | null {
    if (this._layout.currentWidget) {
      return this._layout.currentWidget.title.label;
    }
    return null;
  }

  set currentTabName(title: string | null) {
    if (typeof title !== "string") {
      throw Error("Tab name must be a string");
    }

    const widget = this.getWidget(title);
    if (!widget) {
      throw Error(`Cannot find ${title} widget`);
    }

    this._layout.currentWidget = widget;
  }
}

customElements.define(HTMLPhosphorTabElement.is, HTMLPhosphorTabElement);
