import { LitElement, html, css } from 'lit';
import { departments, positions } from '../data/constants.js';

class AddEditEmployee extends LitElement {
  static properties = {
    firstName: { type: String },
    lastName: { type: String },
    dateOfEmployment: { type: String },
    dateOfBirth: { type: String },
    phone: { type: String },
    email: { type: String },
    department: { type: String },
    position: { type: String }
  };

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
  }

  render() {
    return html`
      <form @submit=${this._handleSave} class="form">
        <div class="row">
          <!-- First Name -->
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input id="firstName" type="text" class="form-control" .value=${this.firstName} @input=${e => this.firstName = e.target.value} required />
          </div>
          <!-- Last Name -->
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input id="lastName" type="text" class="form-control" .value=${this.lastName} @input=${e => this.lastName = e.target.value} required />
          </div>
          <!-- Date of Employment -->
          <div class="form-group">
            <label for="dateOfEmployment">Date of Employment</label>
            <input id="dateOfEmployment" type="date" class="form-control" .value=${this.dateOfEmployment} @input=${e => this.dateOfEmployment = e.target.value} required />
          </div>
        </div>

        <div class="row">
          <!-- Date of Birth -->
          <div class="form-group">
            <label for="dateOfBirth">Date of Birth</label>
            <input id="dateOfBirth" type="date" class="form-control" .value=${this.dateOfBirth} @input=${e => this.dateOfBirth = e.target.value} required />
          </div>
          <!-- Phone -->
          <div class="form-group">
            <label for="phone">Phone</label>
            <input id="phone" type="tel" class="form-control" .value=${this.phone} @input=${e => this.phone = e.target.value} required pattern="[0-9]*" />
          </div>
          <!-- Email -->
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" class="form-control" .value=${this.email} @input=${e => this.email = e.target.value} required />
          </div>
        </div>

        <div class="row">
          <!-- Department -->
          <div class="form-group">
            <label for="department">Department</label>
            <select id="department" class="form-control" .value=${this.department} @change=${e => this.department = e.target.value} required>
              <option value="" disabled ?selected=${!this.department}>Please select a department</option>
              ${departments.map(department => html`<option value="${department}">${department}</option>`)}
            </select>
          </div>
          <!-- Position -->
          <div class="form-group">
            <label for="position">Position</label>
            <select id="position" class="form-control" .value=${this.position} @change=${e => this.position = e.target.value} required>
              <option value="" disabled ?selected=${!this.position}>Please select a position</option>
              ${positions.map(position => html`<option value="${position}">${position}</option>`)}
            </select>
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

  // Save button handler
  handleSave(e) {
    e.preventDefault();
    console.log('Save clicked:', {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfEmployment: this.dateOfEmployment,
      dateOfBirth: this.dateOfBirth,
      phone: this.phone,
      email: this.email,
      department: this.department,
      position: this.position
    });
  }

  // Cancel button handler
  handleCancel() {
    console.log('Cancel clicked');
  }

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
