// src/components/WorkLogList.js

import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const WorkLogList = ({ workLogs, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Hours Worked</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.employeeName}</TableCell>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.hours}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(log)}><Edit /></IconButton>
                <IconButton onClick={() => onDelete(log.id)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkLogList;
// This component is used to display a list of work logs in a table format.