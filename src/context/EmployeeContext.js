import React, { createContext, useReducer, useEffect, useRef } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

const initialState = {
  employees: [],
  loading: true,
  error: null,
};

const employeeReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_EMPLOYEES':
      return { ...state, employees: action.payload, loading: false };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(emp => 
          emp.employeeId === action.payload.employeeId ? action.payload : emp
        ),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Provider component
const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);
  const loadedRef = useRef(false);

  const loadEmployees = async () => {
    try {
      const response = await axios.get('https://emp-dashboard-backend-jv4n.onrender.com/api/employees');
      dispatch({ type: 'LOAD_EMPLOYEES', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load employees' });
    }
  };

  const updateEmployee = async (employeeData) => {
    try {
      const response = await axios.put(`https://emp-dashboard-backend-jv4n.onrender.com/api/employees/${employeeData.employeeId}`, employeeData);
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update employee' });
    }
  };

  useEffect(() => {
    if (!loadedRef.current) {
      loadEmployees();
      loadedRef.current = true;
    }
  }, []);

  return (
    <EmployeeContext.Provider value={{
      employees: state.employees,
      loading: state.loading,
      error: state.error,
      loadEmployees,
      updateEmployee, // Add updateEmployee to the provider value
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
