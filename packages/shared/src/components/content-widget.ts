import { Widget } from "@phosphor/widgets";
import { HTMLPhosphorWidgetElement } from "./widget";

export class PhosphorContentWidget extends Widget {
  constructor(widget: HTMLPhosphorWidgetElement) {
    super();
    this.title.label = widget.getAttribute("data-title") || "UNKNOWN";
    this.node.appendChild(widget);
    this.title.closable =
      widget.getAttribute("data-closable") !== null && widget.getAttribute("data-closable") !== "false";
  }

  public onResize() {
    (this.node.firstChild as HTMLPhosphorWidgetElement).resize();
  }

  public onBeforeAttach() {
    (this.node.firstChild as HTMLPhosphorWidgetElement).widget = this;
  }

  public onBeforeDetach() {
    (this.node.firstChild as HTMLPhosphorWidgetElement).widget = null;
  }

  public onBeforeHide() {
    (this.node.firstChild as HTMLPhosphorWidgetElement).dispatchEvent(new CustomEvent("widget-hide"));
  }

  public onBeforeShow() {
    (this.node.firstChild as HTMLPhosphorWidgetElement).dispatchEvent(new CustomEvent("widget-show"));
  }
}
