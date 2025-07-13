import { expect, describe, it } from 'vitest';
import { routes } from '../src/routes.js';

describe('routes config', () => {
  it('should be an array with routes', () => {
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBeGreaterThan(0);
  });

  it('should contain required route paths and components', () => {
    const paths = routes.map(r => r.path);
    const components = routes.map(r => r.component);

    expect(paths).toContain('/');
    expect(paths).toContain('/add');
    expect(components).toContain('employee-list');
    expect(components).toContain('add-edit-employee');
  });
});
