import { LitElement, html, css } from 'lit';
import validate from 'validate.js';
import Swal from 'sweetalert2';
import { departments, positions } from '../data/constants.js';
import { store } from "../store/index.js";
import { addEmployee } from '../store/employeeSlice.js'

validate.extend(validate.validators.datetime, {
  parse: function(value) {
    return new Date(value);
  },
  format: function(value) {
    return new Date(value).toISOString().split('T')[0];
  }
});

class AddEditEmployee extends LitElement {
  // PROPERTIES
  static properties = {
    firstName: { type: String },
    lastName: { type: String },
    dateOfEmployment: { type: String },
    dateOfBirth: { type: String },
    phone: { type: String },
    email: { type: String },
    department: { type: String },
    position: { type: String },
    validationErrors: { type: Object },
  };

  // VALIDATIONS
  get validationRules() {
    return {
      // First name
      firstName: {
        presence: { allowEmpty: false, message: "is required"},
        length: { minimum: 2, maximum: 50, message: "must be between 2 and 50 characters long" }
      },
      // Last Name
      lastName: {
        presence: { allowEmpty: false, message: "is required"},
        length: { minimum: 2, maximum: 50, message: "must be between 2 and 50 characters long" }
      },
      // Date of Employment
      dateOfEmployment: {
        presence: { allowEmpty: false, message: "is required" },
        datetime: { dateOnly: true, message: "must be a valid date" }
      },
      // Date of Birth
      dateOfBirth: {
        presence: { allowEmpty: false, message: "is required" },
        datetime: { dateOnly: true, message: "must be a valid date" }
      },
      // Phone
      phone: {
        presence: { allowEmpty: false, message: "is required" },
        format: {
          pattern: "^[0-9]+$",
          message: "must contain only numbers"
        }
      },
      // Email
      email: {
        presence: { allowEmpty: false, message: "is required" },
        email: { message: "is not valid" }
      },
      // Department
      department: {
        presence: { allowEmpty: false, message: "is required" }
      },
      // Position
      position: {
        presence: { allowEmpty: false, message: "is required" }
      }
    }
  }

  // CONSTRUCTOR
  constructor() {
    super();
    this.firstName = '';
    this.lastName = '';
    this.dateOfEmployment = '';
    this.dateOfBirth = '';
    this.phone = '';
    this.email = '';
    this.department = '';
    this.position = '';
    this.validationErrors = {};
  }

  // TEMPLATE
  render() {
    return html`
      <form @submit=${this.handleSave} class="form">
        <div class="row">
          <!-- First Name -->
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input id="firstName" type="text" class="form-control" .value=${this.firstName} @input=${e => this.firstName = e.target.value} />
            ${this.validationErrors.firstName ? html`<span class="error">${this.validationErrors.firstName}</span>` : ''}
          </div>
          <!-- Last Name -->
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input id="lastName" type="text" class="form-control" .value=${this.lastName} @input=${e => this.lastName = e.target.value} />
            ${this.validationErrors.lastName ? html`<span class="error">${this.validationErrors.lastName}</span>` : ''}
          </div>
          <!-- Date of Employment -->
          <div class="form-group">
            <label for="dateOfEmployment">Date of Employment</label>
            <input id="dateOfEmployment" type="date" class="form-control" .value=${this.dateOfEmployment} @input=${e => this.dateOfEmployment = e.target.value} />
            ${this.validationErrors.dateOfEmployment ? html`<span class="error">${this.validationErrors.dateOfEmployment}</span>` : ''}
          </div>
        </div>

        <div class="row">
          <!-- Date of Birth -->
          <div class="form-group">
            <label for="dateOfBirth">Date of Birth</label>
            <input id="dateOfBirth" type="date" class="form-control" .value=${this.dateOfBirth} @input=${e => this.dateOfBirth = e.target.value} />
            ${this.validationErrors.dateOfBirth ? html`<span class="error">${this.validationErrors.dateOfBirth}</span>` : ''}
          </div>
          <!-- Phone -->
          <div class="form-group">
            <label for="phone">Phone</label>
            <input id="phone" type="tel" class="form-control" .value=${this.phone} @input=${e => this.phone = e.target.value} pattern="[0-9]*" />
            ${this.validationErrors.phone ? html`<span class="error">${this.validationErrors.phone}</span>` : ''}
          </div>
          <!-- Email -->
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" class="form-control" .value=${this.email} @input=${e => this.email = e.target.value} />
            ${this.validationErrors.email ? html`<span class="error">${this.validationErrors.email}</span>` : ''}
          </div>
        </div>

        <div class="row">
          <!-- Department -->
          <div class="form-group">
            <label for="department">Department</label>
            <select id="department" class="form-control" .value=${this.department} @change=${e => this.department = e.target.value}>
              <option value="" disabled ?selected=${!this.department}>Please select a department</option>
              ${departments.map(department => html`<option value="${department}">${department}</option>`)}
            </select>
            ${this.validationErrors.department ? html`<span class="error">${this.validationErrors.department}</span>` : ''}
          </div>
          <!-- Position -->
          <div class="form-group">
            <label for="position">Position</label>
            <select id="position" class="form-control" .value=${this.position} @change=${e => this.position = e.target.value}>
              <option value="" disabled ?selected=${!this.position}>Please select a position</option>
              ${positions.map(position => html`<option value="${position}">${position}</option>`)}
            </select>
            ${this.validationErrors.position ? html`<span class="error">${this.validationErrors.position}</span>` : ''}
          </div>
        </div>

        <!-- Buttons -->
        <div class="buttons">
          <button type="submit">Save</button>
          <button type="button" @click=${this.handleCancel}>Cancel</button>
        </div>
      </form>
    `;
  }

  // METHODS
  // Save button handler
  handleSave(e) {
    e.preventDefault();

    const newEmployee = {
      id: Date.now(),
      firstName: this.capitalize(this.firstName.trim()),
      lastName: this.capitalize(this.lastName.trim()),
      dateOfEmployment: this.dateOfEmployment,
      dateOfBirth: this.dateOfBirth,
      phone: this.phone,
      email: this.email,
      department: this.department,
      position: this.position
    };

    const errors = validate(newEmployee, this.validationRules);
    if (errors) {
      this.showValidationErrors(errors);
      return;
    }

    // Add employee to the store
    store.dispatch(addEmployee(newEmployee));
    this.resetForm()

    // Redirect to employee list
    window.history.pushState({}, '', '/employees');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  // Capitalize first letter
  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  // Cancel button handler
  handleCancel() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Your changes will be lost!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff6201',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, cancel',
      cancelButtonText: 'No, keep editing',
    }).then((result) => {
      if (result.isConfirmed) {
        window.history.back();
      }
    });
  }

  // Rest form
  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.dateOfEmployment = '';
    this.dateOfBirth = '';
    this.phone = '';
    this.email = '';
    this.department = '';
    this.position = '';
    this.validationErrors = {};
  }

  // Show validation errors
  showValidationErrors(errors) {
    this.validationErrors = {};

    for (const error in errors) {
      this.validationErrors[error] = errors[error][0];
    }
  }

  // STYLES
  static styles = css`
    :host {
      display: block;
      max-width: 900px;
      margin: 20px auto;
      font-family: Roboto, sans-serif;
      padding: 16px;
      box-sizing: border-box;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .row {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    .form-group {
      flex: 1 1 calc(33.333% - 20px);
      display: flex;
      flex-direction: column;
    }

    label {
      font-weight: 600;
      font-size: 0.9rem;
      color: #333;
      margin-bottom: 6px;
    }

    input, select {
      padding: 8px 10px;
      font-size: 1rem;
      border-radius: 6px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      font-family: inherit;
      outline-offset: 2px;
      outline-color: #ff6201;
      transition: border-color 0.3s ease;
    }

    input:focus, select:focus {
      border-color: #ff6201;
    }

    .buttons {
      display: flex;
      justify-content: center;
      gap: 12px;
    }

    button {
      padding: 10px 18px;
      font-size: 1rem;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      background-color: #ff6201;
      color: white;
      transition: background-color 0.3s ease;
    }

    button[type="button"] {
      background-color: #ccc;
      color: #333;
    }

    button:hover {
      background-color: #e55500;
    }

    button[type="button"]:hover {
      background-color: #aaa;
    }

    .error {
      color: red;
      font-size: 0.85rem;
      margin-top: 4px;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .row {
        flex-direction: column;
      }
      .form-group {
        flex: 1 1 100%;
      }
    }
  `;
}

customElements.define('add-edit-employee', AddEditEmployee);
