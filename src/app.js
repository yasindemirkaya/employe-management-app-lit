import { LitElement, html, css } from 'lit';
import store from './store/index.js'
import { watch } from 'lit-redux-watch';

class AppRoot extends LitElement {
  static properties = {
    employees: { type: Array },
    searchTerm: { type: String },
    viewMode: { type: String },
    currentPage: { type: Number },
    pageSize: { type: Number }
  };

constructor() {
    super();
    this.employees = [];
    this.searchTerm = '';
    this.viewMode = 'table';
    this.currentPage = 1;
    this.pageSize = 5;

    watch(store, state => state.employee.employees, employees => {
      this.employees = employees;
    });

    watch(store, state => state.employee.searchTerm, searchTerm => {
      this.searchTerm = searchTerm;
    });

    watch(store, state => state.employee.viewMode, viewMode => {
      this.viewMode = viewMode;
    });

    watch(store, state => state.employee.currentPage, currentPage => {
      this.currentPage = currentPage;
    });

    watch(store, state => state.employee.pageSize, pageSize => {
      this.pageSize = pageSize;
    });
  }
  
  render() {
    return html`
      <h1>Employee Management Application</h1>
      <p>My first LitElement Component.</p>
    `;
  }
}

customElements.define('app-root', AppRoot);
