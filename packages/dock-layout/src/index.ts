import { IIterator, topologicSort } from "@phosphor/algorithm";
import { DockLayout, DockPanel } from "@phosphor/widgets";
import * as debug from "debug";
import { HTMLPhosphorElement, HTMLPhosphorWidgetElement, PhosphorContentWidget } from "phosphor-layout-shared";

const log = debug("phosphor:layout:dock");

function iterToArray<T>(iter: IIterator<T>): T[] {
  let value = iter.next();
  const res = [];
  while (value) {
    res.push(value);
    value = iter.next();
  }
  return res;
}

export class HTMLPhosphorDockElement extends HTMLPhosphorElement<DockPanel> {
  static get is() {
    return "phosphor-dock-layout";
  }

  static get observedAttributes(): string[] {
    return ["data-spacing"];
  }

  constructor() {
    super();
    this._layout.layoutModified.connect(() => {
      this.dispatchEvent(
        new CustomEvent("layout-change", {
          detail: {
            layout: this.saveLayout()
          }
        })
      );
    });
  }

  /**
   * Get the layout configuration for this DockPanel
   */
  public saveLayout(): DockPanel.ILayoutConfig {
    return this._layout.saveLayout();
  }

  /**
   * Restore the configuration for this DockPanel
   */
  public restoreLayout(layout: DockPanel.ILayoutConfig): void {
    return this._layout.restoreLayout(layout);
  }

  public get selectedWidgets() {
    return iterToArray(this._layout.selectedWidgets()).map(widget => widget.title.label);
  }

  public selectWidget(title: string) {
    const widget = this.getWidget(title);
    if (widget) {
      this._layout.selectWidget(widget);
    } else {
      log(`Cannot find widget ${title}`);
    }
  }

  public attributeChangedCallback(attr: string, _: string, newValue: string) {
    switch (attr) {
      case "data-spacing": {
        if (this._layout) {
          try {
            const value = newValue || "4";
            this._layout.spacing = parseFloat(value);
          } catch (e) {
            log(e);
          }
        }
      }
    }
  }

  protected _initLayout() {
    return new DockPanel();
  }

  protected addWidget(child: HTMLPhosphorWidgetElement): PhosphorContentWidget {
    const widget = new PhosphorContentWidget(child);
    const options: DockPanel.IAddOptions = {
      mode: (child.getAttribute("data-mode") || "split-right") as DockLayout.InsertMode
    };
    if (child.hasAttribute("data-relative")) {
      options.ref = this.getWidget(child.getAttribute("data-relative") as string);
    }
    this._layout.addWidget(widget, options);
    return widget;
  }

  protected getWidget(title: string): PhosphorContentWidget | null {
    const widgets = iterToArray(this._layout.widgets());
    for (let i = 0; i < widgets.length; i += 1) {
      const widget = widgets[i] as PhosphorContentWidget;
      if (widget.title.label === title) {
        return widget;
      }
    }
    return null;
  }

  protected _getChildWidgets(): HTMLPhosphorWidgetElement[] {
    const children: HTMLPhosphorWidgetElement[] = Array.prototype.slice.call(this.children).filter((child: Element) => {
      const validTagName = child.tagName.toLowerCase() === HTMLPhosphorWidgetElement.is;
      if (!validTagName) {
        log(`${child} from phosphor layout because it is not a phosphor-widget`);
        child.remove();
      }
      return validTagName;
    });

    const childrenMap = children.reduce(
      (widgets, widget) => ({
        ...widgets,
        [widget.getAttribute("data-title") as string]: widget
      }),
      {} as { [key: string]: HTMLPhosphorWidgetElement | undefined }
    );

    const widgetGraph: any = children.filter(widget => widget.hasAttribute("data-relative")).map(widget => {
      return [widget.getAttribute("data-title") as string, widget.getAttribute("data-relative") as string];
    });

    const sortedWidgets = topologicSort<string>(widgetGraph)
      .reverse()
      .map((title: string) => {
        const widget: HTMLPhosphorWidgetElement = childrenMap[title] as HTMLPhosphorWidgetElement;
        delete childrenMap[title];
        return widget;
      });
    const remainingWidgets = Object.keys(childrenMap).map(key => childrenMap[key] as HTMLPhosphorWidgetElement);

    return sortedWidgets.concat(remainingWidgets);
  }
}

customElements.define(HTMLPhosphorDockElement.is, HTMLPhosphorDockElement);
