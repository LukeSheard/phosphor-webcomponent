import { Widget } from "@phosphor/widgets";
import { HTMLPhosphorWidgetElement } from "./widget";

export class PhosphorContentWidget extends Widget {
  constructor(widget: HTMLPhosphorWidgetElement) {
    super();
    this.title.label = widget.getAttribute("data-title") || "UNKNOWN";
    this.node.appendChild(widget);
    this.title.closable =
      widget.getAttribute("data-closable") !== null &&
      widget.getAttribute("data-closable") !== "false";
  }

  onResize() {
    (this.node.firstChild as HTMLPhosphorWidgetElement).resize();
  }

  onBeforeAttach() {
    (this.node.firstChild as HTMLPhosphorWidgetElement).widget = this;
  }

  onBeforeDetach() {
    (this.node.firstChild as HTMLPhosphorWidgetElement).widget = null;
  }
}
