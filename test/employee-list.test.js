import { fixture, html } from '@open-wc/testing';
import { expect, vi } from 'vitest';

import { store } from '../src/store/index.js'; 

import '../src/components/employee-list.js';

import Swal from 'sweetalert2';

// Mock sweet alert
vi.mock('sweetalert2', () => {
  return {
    default: {
      fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
    },
  };
});

describe('employee-list', () => {
    // Component rendering
    it('should render the component, title and the search area', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);
        const shadow = el.shadowRoot;

        // Title
        const title = shadow.querySelector('h2');
        expect(title).to.exist;
        expect(title.textContent.toLowerCase()).to.include('employee list');

        // Search
        const searchInput = shadow.querySelector('input[type="text"]');
        expect(searchInput).to.exist;

        // Default view mode 
        expect(el.viewMode).to.equal('table');
    });

    // Search area update test
    it('should update the search term when user types in the search area', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);
        const shadow = el.shadowRoot;

        const searchInput = shadow.querySelector('input[type="text"]');
        searchInput.value = 'Ahmet';
        searchInput.dispatchEvent(new Event('input'));

        await el.updateComplete;

        expect(el.searchTerm).to.equal('Ahmet');
    })

    // Toggle view mode
    it('should toggle between table and list view modes', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);
        const shadow = el.shadowRoot;

        expect(el.viewMode).to.equal('table');
        const buttons = shadow.querySelectorAll('.view-buttons button');
        const [tableBtn, listBtn] = buttons;

        // List view
        listBtn.click();
        await el.updateComplete;
        expect(el.viewMode).to.equal('list');

        // Table view
        tableBtn.click();
        await el.updateComplete;
        expect(el.viewMode).to.equal('table');
    })

    // Delete 
    it('should call Swal and delete employee on confirm', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);

        // Employee
        const employeeToDelete = el.employees[0];
        expect(employeeToDelete).to.exist;


        el.deleteEmployee(employeeToDelete.id);
        await new Promise(r => setTimeout(r, 0));

        // Expect swal to appear
        expect(Swal.fire).toHaveBeenCalled();


        const state = store.getState().employee;
        // If deletion is failed, the employee should still exist
        const stillExists = state.employees.find(e => e.id === employeeToDelete.id);
        // If employee still exists, the test should fail
        expect(stillExists).to.be.undefined;
    });

    // Edit
    it('should update the URL when editEmployee is called', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);
        const employeeToEdit = el.employees[0];
        expect(employeeToEdit).to.exist;

        const pushStateSpy = vi.spyOn(window.history, 'pushState');
        const popStateSpy = vi.fn();
        window.addEventListener('popstate', popStateSpy);

        el.editEmployee(employeeToEdit);

        expect(pushStateSpy).toHaveBeenCalledWith({}, '', `/edit?id=${employeeToEdit.id}`);

        // PopState event'in tetiklenip tetiklenmediğini kontrol et
        expect(popStateSpy).toHaveBeenCalled();

        // Temizlik
        pushStateSpy.mockRestore();
        window.removeEventListener('popstate', popStateSpy);
    })
});