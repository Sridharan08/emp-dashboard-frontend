import React from 'react';
import { Modal, Tab, Tabs } from '@mui/material';

const EmployeeModal = ({ employee, isOpen, onClose }) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Details" />
          <Tab label="Real-Time Location" />
          <Tab label="Audit Trail" />
        </Tabs>
        {tabIndex === 0 && (
          <div>{/* Employee details here */}</div>
        )}
        {tabIndex === 1 && (
          <div>{/* Real-time location map here */}</div>
        )}
        {tabIndex === 2 && (
          <div>{/* Audit Trail data here */}</div>
        )}
      </div>
    </Modal>
  );
};

export default EmployeeModal;
