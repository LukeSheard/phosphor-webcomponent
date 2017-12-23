import { TabPanel } from "@phosphor/widgets";
import { PhosphorContentWidget, HTMLPhosphorWidgetElement, HTMLPhosphorElement } from "@phosphorwc/shared";

export class HTMLPhosphorTabElement extends HTMLPhosphorElement<TabPanel> {
  
  static get is() {
    return "phosphor-tab-layout";
  }

  protected _initLayout() {
    return new TabPanel();
  }

  protected addWidget(child: HTMLPhosphorWidgetElement): PhosphorContentWidget {
    const widget = new PhosphorContentWidget(child);
    this._layout.addWidget(widget);
    return widget;
  }
}

customElements.define(HTMLPhosphorTabElement.is, HTMLPhosphorTabElement);