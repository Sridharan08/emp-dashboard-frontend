import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { AuthProvider } from './context/authContext'; // Adjust the path as needed
import EmployeeList from './components/EmployeeList'; // Import your EmployeeList component
import EmployeeDetails from './components/EmployeeDetails'; // Import EmployeeDetails component
import NotFound from './components/NotFound'; // Import a NotFound component for 404 pages
import Dashboard from './components/Dashboard';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
} from '@mui/material'; // Import Material-UI components

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Box sx={{ flexGrow: 1,background:"white" }}>
          <AppBar position="static" sx={{ background: '#43766C' }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Employee Management System
              </Typography>
              <Button color="inherit" component={NavLink} to="/">
                Employee List
              </Button>
              <Button color="inherit" component={NavLink} to="/dashboard">
                Dashboard
              </Button> 
              
            </Toolbar>
          </AppBar>
          <Container>
            <main>
              <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </Container>
          <footer>
            <Box sx={{ textAlign: 'center', padding: '1rem' }}>
              <Typography variant="body2" color="textSecondary">
                © 2024 Employee Dashboard
              </Typography>
            </Box>
          </footer>
        </Box>
      </Router>
    </AuthProvider>
  );
};

export default App;
