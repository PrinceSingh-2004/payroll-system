// src/components/VacationList.js

import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const VacationList = ({ vacations, employees = [], onEdit, onDelete }) => {
  // Helper to get employee name from id
  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.id === id);
    return emp ? emp.fullName : id;
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vacations.map((vacation, index) => (
            <TableRow key={index}>
              <TableCell>{getEmployeeName(vacation.employeeId)}</TableCell>
              <TableCell>{vacation.startDate}</TableCell>
              <TableCell>{vacation.endDate}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(vacation)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(vacation)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {vacations.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No vacation records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VacationList;
// This component is used to display a list of vacations in a table format.