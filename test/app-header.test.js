import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/app-header.js';

describe('app-header', () => {
  it('should render', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    expect(el).to.exist;
  });
});
