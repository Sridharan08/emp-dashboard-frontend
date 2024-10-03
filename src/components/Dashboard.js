import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { EmployeeContext } from '../context/EmployeeContext'; // Import your context

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { employees } = useContext(EmployeeContext); // Get employees from context

  // Process employee data to count by status
  const statusCounts = employees.reduce((acc, employee) => {
    acc[employee.status] = (acc[employee.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCounts), // Status categories
    datasets: [
      {
        label: 'Employee Count',
        data: Object.values(statusCounts), // Corresponding counts
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // You can adjust colors
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Employee Count by Status',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Dashboard;
