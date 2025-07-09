import { LitElement, html, css } from 'lit';

class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 20px;
    }
  `;

  render() {
    return html`
      <h1>Employee Management Application</h1>
      <p>My first LitElement Component.</p>
    `;
  }
}

customElements.define('app-root', AppRoot);
