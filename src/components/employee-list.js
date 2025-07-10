import { LitElement, html, css } from "lit";
import { store } from "../store/index.js";
import {
  deleteEmployee,
  setSearchTerm,
  setCurrentPage,
  setViewMode,
} from "../store/employeeSlice.js";

class EmployeeList extends LitElement {
  // PROPERTIES
  static properties = {
    employees: { type: Array },
    searchTerm: { type: String },
    currentPage: { type: Number },
    pageSize: { type: Number },
    viewMode: { type: String },
  };

  // CONSTRUCTOR
  constructor() {
    super();
    this.employees = [];
    this.searchTerm = "";
    this.currentPage = 1;
    this.pageSize = 5;

    // Note: I searched on the internet and asked AIs how to connect the store to a web component on Lit and found these pieces of codes.
    // I am not familiar this concept of being subscribed or unsubscribed to the store since it is a bit different than what I used to on Nuxtjs or Nextjs but I can understand why they are being used.
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState().employee;
      this.searchTerm = state.searchTerm;
      this.currentPage = state.currentPage;
      this.pageSize = state.pageSize;

      const filtered = state.employees.filter(
        (e) =>
          e.firstName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          e.lastName.toLowerCase().includes(state.searchTerm.toLowerCase())
      );

      const startIndex = (state.currentPage - 1) * state.pageSize;
      const paged = filtered.slice(startIndex, startIndex + state.pageSize);

      this.employees = paged;
      this.viewMode = state.viewMode;
    });

    const initialState = store.getState().employee;
    this.searchTerm = initialState.searchTerm;
    this.currentPage = initialState.currentPage;
    this.pageSize = initialState.pageSize;
    this.viewMode = initialState.viewMode;
    this.employees = initialState.employees.slice(0, this.pageSize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  // METHODS
  // Change page
  changePage(page) {
    store.dispatch(setCurrentPage(page));
  }

  // Search
  onSearchInput(e) {
    const value = e.target.value;
    store.dispatch(setSearchTerm(value));
  }

  // Delete
  deleteEmployee(id) {
    store.dispatch(deleteEmployee(id));
  }

  // Edit
  editEmployee(e) {
    alert("Now editing " + e.firstName + " " + e.lastName);
  }

  // TABLE VIEW
  renderTableView() {
    return html`
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Employment</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.employees.map(
              (e) => html`
                <tr>
                  <td>${e.firstName}</td>
                  <td>${e.lastName}</td>
                  <td>${e.dateOfEmployment}</td>
                  <td>${e.dateOfBirth}</td>
                  <td>${e.phone}</td>
                  <td>${e.email}</td>
                  <td>${e.department}</td>
                  <td>${e.position}</td>
                  <td class="actions">
                    <button @click=${() => this.editEmployee(e)}>✏️</button>
                    <button @click=${() => this.deleteEmployee(e.id)}>🗑️</button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  // LIST VIEW
renderListView() {
  return html`
    <div class="list-view">
      ${this.employees.map(e => html`
        <div class="employee-card">
          <div class="employee-info-grid">
            <div><strong>First Name:</strong> ${e.firstName}</div>
            <div><strong>Last Name:</strong> ${e.lastName}</div>
            <div><strong>Date of Employment:</strong> ${e.dateOfEmployment}</div>
            <div><strong>Date of Birth:</strong> ${e.dateOfBirth}</div>
            <div><strong>Phone:</strong> ${e.phone}</div>
            <div><strong>Email:</strong> ${e.email}</div>
            <div><strong>Department:</strong> ${e.department}</div>
            <div><strong>Position:</strong> ${e.position}</div>
          </div>
          <div class="actions">
            <button @click=${() => this.editEmployee(e)}>✏️</button>
            <button @click=${() => this.deleteEmployee(e.id)}>🗑️</button>
          </div>
        </div>
      `)}
    </div>
  `;
}

  // PAGINATION
  renderPagination() {
    const state = store.getState().employee;

    const filteredCount = state.employees.filter(
      (e) =>
        e.firstName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        e.lastName.toLowerCase().includes(state.searchTerm.toLowerCase())
    ).length;

    const totalPages = Math.ceil(filteredCount / this.pageSize);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return html`
      <nav class="pagination">
        <button
          class="arrow"
          @click=${() => this.changePage(Math.max(1, this.currentPage - 1))}
          aria-label="Previous page"
        >
          &lt;
        </button>

        ${pages.map(
          (page) => html`
            <button
              class=${page === this.currentPage ? "active" : ""}
              @click=${() => this.changePage(page)}
              aria-label="Go to page ${page}"
            >
              ${page}
            </button>
          `
        )}

        <button
          class="arrow"
          @click=${() =>
            this.changePage(Math.min(totalPages, this.currentPage + 1))}
          aria-label="Next page"
        >
          &gt;
        </button>
      </nav>
    `;
  }

  render() {
    return html`
      <!-- Top Menu -->
      <div class="top-menu">
        <h2>Employee List</h2>
        <div class="view-buttons">
          <button
            @click=${() => store.dispatch(setViewMode("table"))}
            title="Table View"
            aria-label="Table View"
          >
            🧾
          </button>
          <button
            @click=${() => store.dispatch(setViewMode("list"))}
            title="List View"
            aria-label="List View"
          >
            📋
          </button>
        </div>
      </div>

      <!-- Search -->
      <input
        type="text"
        placeholder="Search employees"
        .value=${this.searchTerm}
        @input=${this.onSearchInput}
      />

      ${this.viewMode === "table"
        ? html`${this.renderTableView()}`
        : html`${this.renderListView()}`}

      <!-- Pagination -->
      ${this.renderPagination()}
    `;
  }

  // STYLES
  static styles = css`
    :host {
      display: block;
      padding: 10px;
      box-sizing: border-box;
    }

    .top-menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .top-menu h2 {
      color: #ff6201;
      font-size: 1.5rem;
      margin: 0;
    }

    .view-buttons {
      display: flex;
      gap: 10px;
    }

    .view-buttons button {
      background-color: #ff6201;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .view-buttons button:hover {
      background-color: #e55500;
    }

    input {
      margin-bottom: 15px;
      padding: 8px 12px;
      width: 100%;
      max-width: 400px;
      box-sizing: border-box;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: -5px 4px 10px -6px rgba(0, 0, 0, 0.75);
    }

    .table-wrapper {
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      color: black;
      font-family: Roboto, sans-serif;
      table-layout: fixed;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: -5px 4px 10px -6px rgba(0, 0, 0, 0.75);
    }

    thead tr {
      background-color: white;
      color: #ff6201;
    }

    thead th {
      padding: 12px 8px;
      text-align: center;
      font-weight: bold;
      color: inherit;
      border-bottom: 2px solid #ff6201;
    }

    tbody td {
      padding: 5px;
      text-align: center;
      vertical-align: middle;
      word-wrap: break-word;
      color: black;
    }

    tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tbody tr:hover {
      background-color: #f1f1f1;
    }

    td.actions {
      display: flex;
      justify-content: center;
      gap: 8px;
    }

    button {
      background-color: transparent;
      border: none;
      padding: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      transition: background-color 0.3s ease;
      border-radius: 8px;
    }

    button:hover {
      background-color: rgba(255, 98, 1, 0.1);
    }

    button svg {
      fill: #ff6201;
      width: 18px;
      height: 18px;
    }

    .pagination {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 10px;
      width: 100%;
    }

    .pagination button {
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      color: rgba(0, 0, 0, 0.67);
      padding: 6px 10px;
    }

    .pagination button.arrow {
      color: #ff6201;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .pagination button.active {
      background-color: #ff6201;
      color: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      padding: 0;
      font-weight: 600;
      border: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .top-menu {
        flex-direction: column;
        align-items: flex-start;
      }

      .view-buttons {
        align-self: flex-end;
      }

      .table-wrapper {
        overflow-x: visible;
      }

      table {
        display: flex;
        justify-content: center;
      }

      thead {
        display: none;
      }

      tbody {
        width: 100%;
      }

      tbody tr {
        display: block;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 10px;
        background-color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      tbody td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        text-align: left;
        position: relative;
        border: none;
        border-bottom: 1px solid #eee;
      }

      tbody td:last-child {
        border-bottom: none;
      }

      tbody td::before {
        content: attr(data-label);
        font-weight: bold;
        color: #ff6201;
        flex: 1;
        padding-right: 10px;
        min-width: 120px;
      }

      td.actions {
        justify-content: flex-start;
        gap: 10px;
        padding-top: 10px;
      }

      button {
        width: 36px;
        height: 36px;
      }

      button svg {
        width: 20px;
        height: 20px;
      }
    }

    .list-view {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* 👈 sabit 2 sütun */
      gap: 16px;
      margin-top: 20px;
    }

    .employee-card {
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 16px;
      background-color: #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .employee-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 10px;
      column-gap: 20px;
    }

    .employee-info-grid div {
      font-size: 0.95rem;
      color: #333;
    }

    .employee-info-grid strong {
      font-weight: 600;
    }

    .employee-card .actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      justify-content: flex-end;
    }

    .employee-card .actions button {
      background-color: #ff6201;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }

    .employee-card .actions button:hover {
      background-color: #e55500;
    }
  `;
}

customElements.define("employee-list", EmployeeList);
