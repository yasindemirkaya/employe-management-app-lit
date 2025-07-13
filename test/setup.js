if (!customElements.get('vaadin-grid')) {
  customElements.define('vaadin-grid', class extends HTMLElement {});
}
if (!customElements.get('vaadin-grid-sort-column')) {
  customElements.define('vaadin-grid-sort-column', class extends HTMLElement {});
}
if (!customElements.get('vaadin-grid-column')) {
  customElements.define('vaadin-grid-column', class extends HTMLElement {});
}

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
