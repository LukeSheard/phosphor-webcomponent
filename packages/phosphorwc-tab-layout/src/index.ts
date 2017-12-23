import { TabPanel } from "@phosphor/widgets";
import { PhosphorContentWidget, HTMLPhosphorWidgetElement, HTMLPhosphorElement } from "@phosphorwc/shared";

export class HTMLPhosphorTabElement extends HTMLPhosphorElement {
  
  static get is() {
    return "phosphor-tab-layout";
  }

  protected _initLayout() {
    this._layout = new TabPanel();
  }

  protected addWidget(child: HTMLPhosphorWidgetElement): PhosphorContentWidget {
    const widget = new PhosphorContentWidget(child);
    this._layout.addWidget(widget);
    return widget;
  }
}

customElements.define(HTMLPhosphorTabElement.is, HTMLPhosphorTabElement);