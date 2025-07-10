import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [
      { id: Date.now(), firstName: 'Ahmet', lastName: 'Yılmaz', dateOfEmployment: '23-09-2022', dateOfBirth: '17-02-1997', phone: '5394823086', email: 'ahmet@yilmaz.com', department: 'Analytics', position: 'Junior' },
      { id: Date.now(), firstName: 'Ayşe', lastName: 'Kara', dateOfEmployment: '13-09-2018', dateOfBirth: '27-08-1986', phone: '5394823087', email: 'ayse@kara.com', department: 'Tech', position: 'Medior' },
      { id: Date.now(), firstName: 'Mehmet', lastName: 'Kurt', dateOfEmployment: '16-08-2019', dateOfBirth: '14-11-1998', phone: '5394823088', email: 'mehmet@kurt.com', department: 'Tech', position: 'Senior' },
      { id: Date.now(), firstName: 'Elif', lastName: 'Şahin', dateOfEmployment: '05-03-2020', dateOfBirth: '12-06-1992', phone: '5394823089', email: 'elif@sahin.com', department: 'Analytics', position: 'Medior' },
      { id: Date.now(), firstName: 'Can', lastName: 'Demir', dateOfEmployment: '21-11-2017', dateOfBirth: '30-01-1989', phone: '5394823090', email: 'can@demir.com', department: 'Tech', position: 'Senior' },
      { id: Date.now(), firstName: 'Selin', lastName: 'Yıldız', dateOfEmployment: '10-07-2019', dateOfBirth: '09-12-1993', phone: '5394823091', email: 'selin@yildiz.com', department: 'Analytics', position: 'Junior' },
      { id: Date.now(), firstName: 'Burak', lastName: 'Çelik', dateOfEmployment: '15-05-2021', dateOfBirth: '22-07-1995', phone: '5394823092', email: 'burak@celik.com', department: 'Tech', position: 'Junior' },
      { id: Date.now(), firstName: 'Aylin', lastName: 'Öztürk', dateOfEmployment: '01-02-2016', dateOfBirth: '03-09-1987', phone: '5394823093', email: 'aylin@ozturk.com', department: 'Analytics', position: 'Senior' },
      { id: Date.now(), firstName: 'Deniz', lastName: 'Kaya', dateOfEmployment: '28-11-2019', dateOfBirth: '18-04-1991', phone: '5394823094', email: 'deniz@kaya.com', department: 'Tech', position: 'Medior' },
      { id:  Date.now(), firstName: 'Seda', lastName: 'Güneş', dateOfEmployment: '12-09-2018', dateOfBirth: '25-05-1994', phone: '5394823095', email: 'seda@gunes.com', department: 'Analytics', position: 'Medior' },
      { id:  Date.now(), firstName: 'Emre', lastName: 'Taş', dateOfEmployment: '09-04-2020', dateOfBirth: '11-10-1990', phone: '5394823096', email: 'emre@tas.com', department: 'Tech', position: 'Senior' },
      { id:  Date.now(), firstName: 'Zeynep', lastName: 'Yılmaz', dateOfEmployment: '30-08-2017', dateOfBirth: '06-03-1988', phone: '5394823097', email: 'zeynep@yilmaz.com', department: 'Analytics', position: 'Junior' }
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
