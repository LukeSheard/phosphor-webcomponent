import { DockPanel, DockLayout } from "@phosphor/widgets";
import {
  PhosphorContentWidget,
  HTMLPhosphorWidgetElement,
  HTMLPhosphorElement
} from "phosphor-layout-shared";

export class HTMLPhosphorDockElement extends HTMLPhosphorElement<DockPanel> {
  static get is() {
    return "phosphor-dock-layout";
  }

  static get observedAttributes(): string[] {
    return ["data-spacing"];
  }

  protected _initLayout() {
    return new DockPanel();
  }

  protected addWidget(child: HTMLPhosphorWidgetElement): PhosphorContentWidget {
    const widget = new PhosphorContentWidget(child);
    const mode = (child.getAttribute("data-mode") ||
      "split-right") as DockLayout.InsertMode;
    this._layout.addWidget(widget, {
      mode
    });
    return widget;
  }

  attributeChangedCallback(attr: string, _: string, newValue: string) {
    switch (attr) {
      case "data-spacing": {
        if (newValue && this._layout) {
          try {
            const spacing = parseFloat(newValue);
            this._layout.spacing = spacing;
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

customElements.define(HTMLPhosphorDockElement.is, HTMLPhosphorDockElement);
