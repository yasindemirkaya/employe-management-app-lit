import { fixture, expect } from '@open-wc/testing';
import '../src/app.js';

describe('<app-root>', () => {
  it('renders app-header and main', async () => {
    const el = await fixture('<app-root></app-root>');
    expect(el.shadowRoot.querySelector('app-header')).to.exist;
    expect(el.shadowRoot.querySelector('main')).to.exist;

    expect(window.router).to.exist;
    expect(window.router).to.have.property('setRoutes');
  });
});
