import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [
      { id: 1, firstName: 'Ahmet', lastName: 'Yılmaz', dateOfEmployment: '23/09/2022', dateOfBirth: '17/02/1997', phone: '+(90) 539 482 30 86', email: 'ahmet@yilmaz.com', department: 'Analytics', position: 'Junior' },
      { id: 2, firstName: 'Ayşe', lastName: 'Kara', dateOfEmployment: '13/09/2018', dateOfBirth: '27/08/1986', phone: '+(90) 539 482 30 87', email: 'ayse@kara.com', department: 'Tech', position: 'Medior' },
      { id: 3, firstName: 'Mehmet', lastName: 'Kurt', dateOfEmployment: '16/08/2019', dateOfBirth: '14/11/1998', phone: '+(90) 539 482 30 88', email: 'mehmet@kurt.com', department: 'Tech', position: 'Senior' },
      { id: 4, firstName: 'Elif', lastName: 'Şahin', dateOfEmployment: '05/03/2020', dateOfBirth: '12/06/1992', phone: '+(90) 539 482 30 89', email: 'elif@sahin.com', department: 'Analytics', position: 'Medior' },
      { id: 5, firstName: 'Can', lastName: 'Demir', dateOfEmployment: '21/11/2017', dateOfBirth: '30/01/1989', phone: '+(90) 539 482 30 90', email: 'can@demir.com', department: 'Tech', position: 'Senior' },
      { id: 6, firstName: 'Selin', lastName: 'Yıldız', dateOfEmployment: '10/07/2019', dateOfBirth: '09/12/1993', phone: '+(90) 539 482 30 91', email: 'selin@yildiz.com', department: 'Analytics', position: 'Junior' },
      { id: 7, firstName: 'Burak', lastName: 'Çelik', dateOfEmployment: '15/05/2021', dateOfBirth: '22/07/1995', phone: '+(90) 539 482 30 92', email: 'burak@celik.com', department: 'Tech', position: 'Junior' },
      { id: 8, firstName: 'Aylin', lastName: 'Öztürk', dateOfEmployment: '01/02/2016', dateOfBirth: '03/09/1987', phone: '+(90) 539 482 30 93', email: 'aylin@ozturk.com', department: 'Analytics', position: 'Senior' },
      { id: 9, firstName: 'Deniz', lastName: 'Kaya', dateOfEmployment: '28/11/2019', dateOfBirth: '18/04/1991', phone: '+(90) 539 482 30 94', email: 'deniz@kaya.com', department: 'Tech', position: 'Medior' },
      { id: 10, firstName: 'Seda', lastName: 'Güneş', dateOfEmployment: '12/09/2018', dateOfBirth: '25/05/1994', phone: '+(90) 539 482 30 95', email: 'seda@gunes.com', department: 'Analytics', position: 'Medior' },
      { id: 11, firstName: 'Emre', lastName: 'Taş', dateOfEmployment: '09/04/2020', dateOfBirth: '11/10/1990', phone: '+(90) 539 482 30 96', email: 'emre@tas.com', department: 'Tech', position: 'Senior' },
      { id: 12, firstName: 'Zeynep', lastName: 'Yılmaz', dateOfEmployment: '30/08/2017', dateOfBirth: '06/03/1988', phone: '+(90) 539 482 30 97', email: 'zeynep@yilmaz.com', department: 'Analytics', position: 'Junior' }
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
