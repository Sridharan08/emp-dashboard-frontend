import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext';
import { Typography, Box, Button, TextField } from '@mui/material';

const EmployeeDetails = () => {
  const { id } = useParams();
  const { employees, updateEmployee } = useContext(EmployeeContext);
  const employee = employees.find(emp => emp.employeeId === id);

  // Local state for editable fields
  const [editableEmployee, setEditableEmployee] = useState(employee || {});

  useEffect(() => {
    if (employee) {
      setEditableEmployee(employee); // Set the local state when employee is found
    }
  }, [employee]);

  const handleUpdate = () => {
    updateEmployee(editableEmployee); // Call update function with the edited employee data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableEmployee((prev) => ({ ...prev, [name]: value })); // Update local state on input change
  };

  if (!employee) return <Typography>No employee found!</Typography>;

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h5">Edit Employee Details</Typography>
      <TextField
        label="Name"
        name="employeeName"
        value={editableEmployee.name || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={editableEmployee.age || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Department"
        name="department"
        value={editableEmployee.department || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        name="status"
        value={editableEmployee.status || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Employee
      </Button>
    </Box>
  );
};

export default EmployeeDetails;
