export const employeeReducer = (state = { employees: [] }, action) => {
    switch (action.type) {
      case 'EMPLOYEES_FETCH_SUCCESS':
        return { employees: action.payload };
      case 'EMPLOYEES_FETCH_FAIL':
        return { error: action.payload };
      default:
        return state;
    }
  };
  