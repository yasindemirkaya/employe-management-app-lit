// router.js

export class Router {
  constructor(routes = {}) {
    this.routes = routes;
    this.listen();
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this._render();
  }

  listen() {
    window.addEventListener('popstate', () => this._render());
    document.addEventListener('DOMContentLoaded', () => this._render());
  }

  _render() {
    const path = window.location.pathname;
    const viewContainer = document.querySelector('main');

    if (!viewContainer) return;

    // Tüm içerikleri temizle
    viewContainer.innerHTML = '';

    const view = this.routes[path] || this.routes['/404'];

    if (view) {
      const element = document.createElement(view);
      viewContainer.appendChild(element);
    }
  }
}
