export function register(element: any): void {
  return customElements.define(element.is, element);
}
