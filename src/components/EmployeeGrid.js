import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../redux/employeeActions';
import { Grid, Card, Typography, Button } from '@mui/material';
import EmployeeModal from './EmployeeModal';

const EmployeeGrid = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employeeList);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {employees.map((employee) => (
        <Grid item key={employee.employeeId} xs={12} md={6} lg={4}>
          <Card>
            <Typography>{employee.name}</Typography>
            <Button onClick={() => openModal(employee)}>Details</Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EmployeeGrid;
