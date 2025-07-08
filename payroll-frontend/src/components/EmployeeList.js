import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Chip
} from '@mui/material';
import { Visibility, Dashboard } from '@mui/icons-material';

const EmployeeList = ({ employees }) => {
  const navigate = useNavigate();

  const handleViewDashboard = (employeeId) => {
    navigate(`/employees/${employeeId}/dashboard`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Salary / Hourly Rate</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id} hover>
              <TableCell>
                <strong>{emp.fullName}</strong>
              </TableCell>
              <TableCell>
                <Chip 
                  label={emp.role} 
                  color={emp.role === 'salaried' ? 'primary' : 'secondary'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {emp.role === 'salaried' ?
                  (emp.salary ? `₹${emp.salary?.toLocaleString('en-IN')}/year` : '-') :
                  (emp.hourlyRate ? `₹${emp.hourlyRate}/hour` : '-')
                }
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Dashboard />}
                  onClick={() => handleViewDashboard(emp.id)}
                  sx={{ mr: 1 }}
                >
                  Dashboard
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;
// This component is used to display a list of employees in a table format.