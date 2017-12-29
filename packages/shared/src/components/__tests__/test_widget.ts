import { HTMLPhosphorElement } from "../base-element";
import { resize } from "../widget";

describe("Phosphor Shared", () => {
  describe("Widget", () => {
    let container: HTMLDivElement;

    beforeEach(() => {
      container = document.createElement("div");
    });

    describe("resize", () => {
      it("should handle resizes for phosphor elements", () => {
        const dock = document.createElement("phosphor-dock-layout");
        const dockSpy = jasmine.createSpy();
        (dock as HTMLPhosphorElement<any>).resize = dockSpy;

        const tab = document.createElement("phosphor-tab-layout");
        const tabSpy = jasmine.createSpy();
        (tab as HTMLPhosphorElement<any>).resize = tabSpy;

        const div = document.createElement("div");
        const divSpy = jasmine.createSpy();
        (div as any).resize = divSpy;

        const span = document.createElement("span");
        const spanSpy = jasmine.createSpy();
        (span as any).resize = spanSpy;

        container.appendChild(dock);
        container.appendChild(tab);
        container.appendChild(div);
        container.appendChild(span);

        const collection = container.children;
        resize(collection);
        expect(dockSpy.calls.count()).toBe(1);
        expect(tabSpy.calls.count()).toBe(1);
        expect(divSpy.calls.count()).toBe(0);
        expect(spanSpy.calls.count()).toBe(0);
      });
    });
  });
});
