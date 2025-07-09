import { LitElement, html, css } from 'lit';
import './components/employee-list.js';

class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Roboto, sans-serif;
    }
  `;

  render() {
    return html`
      <employee-list></employee-list>
    `;
  }
}

customElements.define('app-root', AppRoot);
