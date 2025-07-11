import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  employees: [
      { id: uuidv4(), firstName: 'Ahmet', lastName: 'Yılmaz', dateOfEmployment: '2022-09-23', dateOfBirth: '1997-02-17', phone: '5394823086', email: 'ahmet@yilmaz.com', department: 'Analytics', position: 'Junior' },
      { id: uuidv4(), firstName: 'Ayşe', lastName: 'Kara', dateOfEmployment: '2018-09-13', dateOfBirth: '1986-08-27', phone: '5394823087', email: 'ayse@kara.com', department: 'Tech', position: 'Medior' },
      { id: uuidv4(), firstName: 'Mehmet', lastName: 'Kurt', dateOfEmployment: '2019-08-16', dateOfBirth: '1998-11-14', phone: '5394823088', email: 'mehmet@kurt.com', department: 'Tech', position: 'Senior' },
      { id: uuidv4(), firstName: 'Elif', lastName: 'Şahin', dateOfEmployment: '2020-03-05', dateOfBirth: '1992-06-12', phone: '5394823089', email: 'elif@sahin.com', department: 'Analytics', position: 'Medior' },
      { id: uuidv4(), firstName: 'Can', lastName: 'Demir', dateOfEmployment: '2017-11-21', dateOfBirth: '1989-01-30', phone: '5394823090', email: 'can@demir.com', department: 'Tech', position: 'Senior' },
      { id: uuidv4(), firstName: 'Selin', lastName: 'Yıldız', dateOfEmployment: '2019-07-10', dateOfBirth: '1993-12-09', phone: '5394823091', email: 'selin@yildiz.com', department: 'Analytics', position: 'Junior' },
      { id: uuidv4(), firstName: 'Burak', lastName: 'Çelik', dateOfEmployment: '2021-05-15', dateOfBirth: '1995-07-22', phone: '5394823092', email: 'burak@celik.com', department: 'Tech', position: 'Junior' },
      { id: uuidv4(), firstName: 'Aylin', lastName: 'Öztürk', dateOfEmployment: '2016-02-01', dateOfBirth: '1987-09-03', phone: '5394823093', email: 'aylin@ozturk.com', department: 'Analytics', position: 'Senior' },
      { id: uuidv4(), firstName: 'Deniz', lastName: 'Kaya', dateOfEmployment: '2019-11-28', dateOfBirth: '1991-04-18', phone: '5394823094', email: 'deniz@kaya.com', department: 'Tech', position: 'Medior' },
      { id: uuidv4(), firstName: 'Seda', lastName: 'Güneş', dateOfEmployment: '2018-09-12', dateOfBirth: '1994-05-25', phone: '5394823095', email: 'seda@gunes.com', department: 'Analytics', position: 'Medior' },
      { id: uuidv4(), firstName: 'Emre', lastName: 'Taş', dateOfEmployment: '2020-04-09', dateOfBirth: '1990-10-11', phone: '5394823096', email: 'emre@tas.com', department: 'Tech', position: 'Senior' },
      { id: uuidv4(), firstName: 'Zeynep', lastName: 'Yılmaz', dateOfEmployment: '2017-08-30', dateOfBirth: '1988-03-06', phone: '5394823097', email: 'zeynep@yilmaz.com', department: 'Analytics', position: 'Junior' }
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
    editEmployee(state, action) {
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
  editEmployee,
  deleteEmployee
} = employeeSlice.actions;

export default employeeSlice.reducer;
