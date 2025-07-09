import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [
    // Initial employee data
    {
      id: 1,
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      dateOfEmployment: '2020-01-15',
      dateOfBirth: '1990-06-10',
      phone: '+905551234567',
      email: 'ahmet.yilmaz@example.com',
      department: 'IT',
      position: 'Developer'
    },
    {
      id: 2,
      firstName: 'Ayşe',
      lastName: 'Kara',
      dateOfEmployment: '2019-03-12',
      dateOfBirth: '1988-12-05',
      phone: '+905551112233',
      email: 'ayse.kara@example.com',
      department: 'HR',
      position: 'HR Manager'
    }
  ],
  searchTerm: '',
  viewMode: 'table', // table or list
  currentPage: 1,
  pageSize: 5
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    addEmployee(state, action) {
      state.employees.push(action.payload);
    },
    updateEmployee(state, action) {
      const index = state.employees.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee(state, action) {
      state.employees = state.employees.filter(e => e.id !== action.payload);
    }
  }
});

export const {
  setSearchTerm,
  setViewMode,
  setCurrentPage,
  setPageSize,
  addEmployee,
  updateEmployee,
  deleteEmployee
} = employeeSlice.actions;

export default employeeSlice.reducer;
