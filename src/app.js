import { LitElement, html, css } from 'lit';
import './components/app-header.js';
import './components/employee-list.js';
import './components/add-edit-employee.js';

class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Roboto, sans-serif;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
    }
  `;

  constructor() {
    super();
    this._onPopState = this._onPopState.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this._onPopState);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onPopState);
    super.disconnectedCallback();
  }

  _onPopState() {
    this.requestUpdate();
  }

  render() {
    const path = window.location.pathname;

    return html`
      <app-header></app-header>
      <div class="container">
        ${this.renderRoute(path)}
      </div>
    `;
  }

  renderRoute(path) {
    switch (path) {
      case '/employees':
      case '/':
        return html`<employee-list></employee-list>`;
      case '/add':
      case '/edit':
        return html`<add-edit-employee></add-edit-employee>`;
      default:
        return html`<p>404 - Page Not Found</p>`;
    }
  }
}

customElements.define('app-root', AppRoot);
