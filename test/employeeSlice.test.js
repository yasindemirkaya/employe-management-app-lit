import { expect } from 'chai';
import reducer, {
  setSearchTerm,
  setViewMode,
  setCurrentPage,
  setPageSize,
  addEmployee,
  editEmployee,
  deleteEmployee
} from '../src/store/employeeSlice';

describe('employeeSlice reducer', () => {
    const initialState = reducer(undefined, { type: '@@INIT' });

    // Search term
    it('should set search term', () => {
        const state = reducer(initialState, setSearchTerm('Ahmet'));
        expect(state.searchTerm).toBe('Ahmet');
    })

    // View mode (table or list)
    it('should set view mode', () => {
        const state = reducer(initialState, setViewMode('list'));
        expect(state.viewMode).toBe('list');
    })

    // Pagination, current page
    it('should set current page to 3', () => {
        const state = reducer(initialState, setCurrentPage(3));
        expect(state.currentPage).toBe(3);
    })

    // Number of employees to be displayed per page
    it('should display 5 employees per page', () => {
        const state = reducer(initialState, setPageSize(5));
        expect(state.pageSize).toBe(5);
    })

    // Add new employee
    it('should add a new employee', () => {
        const newEmployee = {
            id: 'test-id-123',
            firstName: 'Test',
            lastName: 'Employee',
            dateOfEmployment: '2023-10-01',
            dateOfBirth: '1990-01-01',
            phone: "5394823074",
            email: 'test@employee.com',
            department: 'Tech',
            position: 'Senior'
        }

        const state = reducer(initialState, addEmployee(newEmployee));
        expect(state.employees).toContainEqual(newEmployee);
        expect(state.employees.length).toBe(initialState.employees.length + 1);
    })

    // Update employee
    it('should update an existing employee', () => {
        const existingEmployee = initialState.employees[0];
        const updatedEmployee = { ...existingEmployee, firstName: 'TestUpdated'};
        const state = reducer(initialState, editEmployee(updatedEmployee));

        expect(state.employees.find(e => e.id === existingEmployee.id).firstName).toBe('TestUpdated');
    })

    // Delete employee
    it('should delete an employee by id', () => {
        const targetId = initialState.employees[1].id;
        const state = reducer(initialState, deleteEmployee(targetId));

        expect(state.employees.find(e => e.id === targetId)).toBeUndefined();
    });
})