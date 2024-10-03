import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext';
import './EmployeeList.css';

const EmployeeList = () => {
  const { employees, loading, error, loadEmployees } = useContext(EmployeeContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setActiveTab('details'); // Reset to details tab on every click
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  const handleUpdateClick = (employeeId) => {
    navigate(`/employees/${employeeId}`); // Navigate to the update page for this employee
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={loadEmployees}>Retry</button>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <h2 className="employee-list-title">Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId} className="employee-row">
              <td onClick={() => handleRowClick(employee)}>{employee.employeeId}</td>
              <td onClick={() => handleRowClick(employee)}>{employee.name}</td>
              <td onClick={() => handleRowClick(employee)}>{employee.age}</td>
              <td onClick={() => handleRowClick(employee)}>{employee.department}</td>
              <td onClick={() => handleRowClick(employee)}>{employee.status}</td>
              <td>
                <button className="update-button" onClick={() => handleUpdateClick(employee.employeeId)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className="employee-modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <div className="modal-tabs">
              <button
                className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Employee Details
              </button>
              <button
                className={`tab-button ${activeTab === 'location' ? 'active' : ''}`}
                onClick={() => setActiveTab('location')}
              >
                Location Map
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="tab-content">
                <h3>Employee Details</h3>
                <p><strong>ID:</strong> {selectedEmployee.employeeId}</p>
                <p><strong>Name:</strong> {selectedEmployee.name}</p>
                <p><strong>Age:</strong> {selectedEmployee.age}</p>
                <p><strong>Department:</strong> {selectedEmployee.department}</p>
                <p><strong>Status:</strong> {selectedEmployee.status}</p>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="tab-content">
                <h3>Employee Location</h3>
                <div className="map-container">
                  {/* This is a placeholder for the map. Replace with your map integration */}
                  <iframe
                    title="Employee Location"
                    width="100%"
                    height="300"
                    frameBorder="0"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(selectedEmployee.address)}&output=embed`}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
