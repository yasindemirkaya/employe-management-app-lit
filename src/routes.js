import './components/employee-list.js';
import './components/add-edit-employee.js';

export const routes = [
  { path: '/', component: 'employee-list' },
  { path: '/employees', component: 'employee-list' },
  { path: '/add', component: 'add-edit-employee' },
  { path: '/edit', component: 'add-edit-employee' },
];