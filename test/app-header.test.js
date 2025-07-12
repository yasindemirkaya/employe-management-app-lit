import { fixture, html } from '@open-wc/testing';
import { expect, vi } from 'vitest';
import '../src/components/app-header.js';

// Mock i18next
vi.mock('../src/i18n.js', () => ({
  default: {
    language: 'en',
    t: (key) => key,
    changeLanguage: vi.fn(),
    on: vi.fn(),
  },
}));

// Mock Redux store
vi.mock('../src/store/index.js', () => ({
  store: {
    dispatch: vi.fn(),
  },
}));

// Mock action creator
vi.mock('../src/store/settingsSlice.js', () => ({
  setLanguage: vi.fn((lang) => ({ type: 'SET_LANGUAGE', payload: lang })),
}));

describe('app-header', () => {
  // Project name
  it('should render the project name', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    const projectName = el.shadowRoot.querySelector('.project-name');

    expect(projectName).toBeTruthy();
    expect(projectName.textContent).toBe('Project Name');
  });

  // Toggle lang button
  it('should toggle language on button click', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    const button = el.shadowRoot.querySelector('.language-button');
    button.click();
    await el.updateComplete;

    const i18next = (await import('../src/i18n.js')).default;
    const { store } = await import('../src/store/index.js');
    const { setLanguage } = await import('../src/store/settingsSlice.js');

    expect(i18next.changeLanguage).toHaveBeenCalledWith('tr');
    expect(store.dispatch).toHaveBeenCalledWith(setLanguage('tr'));
  });

  // Language button represantation
  it('should show correct next language label', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    const button = el.shadowRoot.querySelector('.language-button');
    expect(button.textContent).toBe('TR');
  });

  // Navigation links
  const navLinks = [
    { name: 'Employees', path: '/employees' },
    { name: 'Add New', path: '/add' },
  ];

  navLinks.forEach(({ name, path }, index) => {
    it(`should navigate to ${path} when ${name} link is clicked.`, async () => {
      vi.spyOn(window.history, 'pushState');
      vi.spyOn(window, 'dispatchEvent');

      const el = await fixture(html`<app-header></app-header>`);
      const links = el.shadowRoot.querySelectorAll('nav a');
      const linkEl = links[index];

      linkEl.click();
      await el.updateComplete;

      expect(window.history.pushState).toHaveBeenCalledWith({}, '', path);
      expect(window.dispatchEvent).toHaveBeenCalledWith(expect.any(PopStateEvent));
    });
  });
});
