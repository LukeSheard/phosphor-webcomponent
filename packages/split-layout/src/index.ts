import { SplitPanel } from "@phosphor/widgets";
import * as debug from "debug";
import { HTMLPhosphorElement, HTMLPhosphorWidgetElement, PhosphorContentWidget } from "phosphor-layout-shared";

export class HTMLPhosphorSplitElement extends HTMLPhosphorElement<SplitPanel> {
  static get is() {
    return "phosphor-split-layout";
  }

  protected _initLayout() {
    return new SplitPanel();
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
}

customElements.define(HTMLPhosphorSplitElement.is, HTMLPhosphorSplitElement);
