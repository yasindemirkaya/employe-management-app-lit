import { expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import '../src/components/add-edit-employee.js';

vi.mock('../src/store/index.js', () => {
  return {
    store: {
      getState: () => ({
        employee: {
          employees: [
            {
                id: 'test-id-123',
                firstName: 'Ahmet',
                lastName: 'Yılmaz',
                dateOfEmployment: '2020-05-20',
                dateOfBirth: '1990-03-15',
                phone: '5551234567',
                email: 'ahmet.yilmaz@example.com',
                department: 'Tech',
                position: 'Junior'
            }
          ]
        },
        settings: { language: 'en' }
      })
    },
  };
});

// Mock swal
vi.mock('sweetalert2', () => {
  return {
    default: {
      fire: vi.fn()
    }
  };
});

describe('add-edit-employee', () => {
    // Empty form test for employee addition
    it('should render the form with empty fields initially', async () => {
        const el = await fixture(html`<add-edit-employee></add-edit-employee>`);
        const shadow = el.shadowRoot;

        const firstNameInput = shadow.querySelector('#firstName');
        const lastNameInput = shadow.querySelector('#lastName');
        const dateOfEmploymentInput = shadow.querySelector('#dateOfEmployment');
        const dateOfBirthInput = shadow.querySelector('#dateOfBirth');
        const phoneInput = shadow.querySelector('#phone');
        const emailInput = shadow.querySelector('#email');
        const departmentSelect = shadow.querySelector('#department');
        const positionSelect = shadow.querySelector('#position');
        const saveButton = shadow.querySelector('button[type="submit"]');
        const cancelButton = shadow.querySelector('button[type="button"]');

        expect(firstNameInput).to.exist;
        expect(firstNameInput.value).to.equal('');

        expect(lastNameInput).to.exist;
        expect(lastNameInput.value).to.equal('');

        expect(dateOfEmploymentInput).to.exist;
        expect(dateOfEmploymentInput.value).to.equal('');

        expect(dateOfBirthInput).to.exist;
        expect(dateOfBirthInput.value).to.equal('');

        expect(phoneInput).to.exist;
        expect(phoneInput.value).to.equal('');

        expect(emailInput).to.exist;
        expect(emailInput.value).to.equal('');

        expect(departmentSelect).to.exist;
        expect(departmentSelect.value).to.equal('');

        expect(positionSelect).to.exist;
        expect(positionSelect.value).to.equal('');

        expect(saveButton).to.exist;
        expect(cancelButton).to.exist;
    });

    // Edit
    it('should fill form inputs when editing an employee', async () => {
        const originalLocation = window.location;
        delete window.location;
        window.location = {
            ...originalLocation,
            search: '?id=test-id-123'
        };

        const el = await fixture(html`<add-edit-employee></add-edit-employee>`);
        const shadow = el.shadowRoot;

        // form elements
        const firstNameInput = shadow.querySelector('#firstName');
        const lastNameInput = shadow.querySelector('#lastName');
        const dateOfEmploymentInput = shadow.querySelector('#dateOfEmployment');
        const dateOfBirthInput = shadow.querySelector('#dateOfBirth');
        const phoneInput = shadow.querySelector('#phone');
        const emailInput = shadow.querySelector('#email');
        const departmentSelect = shadow.querySelector('#department');
        const positionSelect = shadow.querySelector('#position');

        expect(firstNameInput.value).to.equal('Ahmet');
        expect(lastNameInput.value).to.equal('Yılmaz');
        expect(dateOfEmploymentInput.value).to.equal('2020-05-20');
        expect(dateOfBirthInput.value).to.equal('1990-03-15');
        expect(phoneInput.value).to.equal('5551234567');
        expect(emailInput.value).to.equal('ahmet.yilmaz@example.com');
        expect(departmentSelect.value).to.equal('Tech');
        expect(positionSelect.value).to.equal('Junior');

        window.location = originalLocation;
    });

    // Validation tests
    it('should show validation errors for faulty fields', async () => {
        const el = await fixture(html`<add-edit-employee></add-edit-employee>`);
        el.firstName = '';
        el.lastName = '';
        el.dateOfEmployment = '';
        el.dateOfBirth = '';
        el.phone = 'abc123'; 
        el.email = 'not-an-email'; 
        el.department = '';
        el.position = '';

        const form = el.shadowRoot.querySelector('form');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        await el.updateComplete;

        expect(el.validationErrors.firstName).to.exist;
        expect(el.validationErrors.email).to.exist;
    })
});