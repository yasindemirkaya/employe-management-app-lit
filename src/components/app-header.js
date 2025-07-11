import { LitElement, html, css } from 'lit';
import i18next from '../i18n.js';

import { store } from '../store/index.js';
import { setLanguage } from '../store/settingsSlice.js';

class AppHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: white;
      border-bottom: 1px solid #eee;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      position: sticky;
      top: 0;
      z-index: 1000;
      font-family: Roboto, sans-serif;
    }

    .header {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    .project-name {
      font-size: 1.5rem;
      font-weight: bold;
      color: #ff6201;
      user-select: none;
    }

    .nav {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .nav button,
    .nav a {
      background: none;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      color: #ff6201;
      text-decoration: none;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 6px;
      transition: background-color 0.3s ease;
      user-select: none;
    }

    .nav a:hover,
    .nav button:hover {
      background-color: rgba(255, 98, 1, 0.1);
    }

    .language-button {
      border-left: 1px solid #ccc;
      margin-left: 8px;
      padding-left: 12px;
    }
  `;

  constructor() {
    super();
    i18next.on('languageChanged', () => this.requestUpdate());
  }

  render() {
    const currentLang = i18next.language;
    const nextLang = currentLang === 'tr' ? 'EN' : 'TR';

    return html`
      <header class="header">
        <div class="project-name">${i18next.t('Project Name')}</div>
        <nav class="nav">
          <a @click=${() => this.navigateTo('/employees')}>${i18next.t('Employees')}</a>
          <a @click=${() => this.navigateTo('/add')}>${i18next.t('Add New')}</a>
          <button class="language-button" @click=${this.toggleLanguage}>${nextLang}</button>
        </nav>
      </header>
    `;
  }

  navigateTo(path) {
    // To work like an SPA without reloading the page...
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  toggleLanguage() {
    const current = i18next.language;
    const next = current === 'tr' ? 'en' : 'tr';
    i18next.changeLanguage(next);
    store.dispatch(setLanguage(next));
  }
}

customElements.define('app-header', AppHeader);
