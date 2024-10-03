import axios from 'axios';

export const fetchEmployees = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/employees');
    dispatch({ type: 'EMPLOYEES_FETCH_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'EMPLOYEES_FETCH_FAIL', payload: error });
  }
};
