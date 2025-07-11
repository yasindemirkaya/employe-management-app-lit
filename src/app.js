import { LitElement, html, css } from 'lit';

import { Router } from '@vaadin/router';
import { routes } from './routes.js';


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

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('main');
    const router = new Router(outlet);
    router.setRoutes(routes);
    window.router = router;
  }

  render() {
    return html`
      <app-header></app-header>
      <main class="container"></main>
    `;
  }
}

customElements.define('app-root', AppRoot);
