import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Chip
} from '@mui/material';
import { Visibility, Dashboard } from '@mui/icons-material';
import { ThemeContext } from '../contexts/ThemeContext';

const EmployeeList = ({ employees }) => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const handleViewDashboard = (employeeId) => {
    navigate(`/employees/${employeeId}/dashboard`);
  };

  return (
    <TableContainer component={Paper} className={darkMode ? 'glass-dark' : 'glass'}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: darkMode ? '#fff' : '#181c24', fontSize: '1.05rem' }}>Full Name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: darkMode ? '#fff' : '#181c24', fontSize: '1.05rem' }}>Role</TableCell>
            <TableCell sx={{ fontWeight: 700, color: darkMode ? '#fff' : '#181c24', fontSize: '1.05rem' }}>Salary / Hourly Rate</TableCell>
            <TableCell sx={{ fontWeight: 700, color: darkMode ? '#fff' : '#181c24', fontSize: '1.05rem' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id} hover sx={{ transition: 'background 0.2s', '&:hover': { background: darkMode ? 'rgba(46,60,255,0.07)' : 'rgba(227,240,255,0.12)' } }}>
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
                  sx={{ mr: 1, fontWeight: 600 }}
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