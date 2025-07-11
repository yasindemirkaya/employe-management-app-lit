export const routes = [
  {
    path: '/',
    component: 'employee-list',
  },
  {
    path: '/employees',
    redirect: '/',
  },
  {
    path: '/add',
    component: 'add-edit-employee',
  },
  {
    path: '/edit/:id',
    component: 'add-edit-employee',
  },
  {
    path: '(.*)',
    component: 'employee-list',
  },
];
