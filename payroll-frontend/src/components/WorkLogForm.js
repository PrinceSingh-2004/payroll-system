// src/components/WorkLogForm.js

import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Paper, Typography, MenuItem
} from '@mui/material';
import { getAllEmployees } from '../services/employeeService';

const WorkLogForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    date: '',
    hoursWorked: ''
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then(res => setEmployees(res.data));
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        employeeId: initialData.employeeId || '',
        date: initialData.date || '',
        hoursWorked: initialData.hoursWorked || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ employeeId: '', date: '', hoursWorked: '' });
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {initialData ? 'Edit Work Log' : 'Add Work Log'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Employee"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              fullWidth required
            >
              {employees.map(emp => (
                <MenuItem key={emp.id} value={emp.id}>{emp.fullName}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="date"
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Hours Worked"
              name="hoursWorked"
              type="number"
              value={formData.hoursWorked}
              onChange={handleChange}
              fullWidth required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item>
            <Button type="submit" variant="contained">Save</Button>
          </Grid>
          {onCancel && (
            <Grid item>
              <Button onClick={onCancel} variant="outlined" color="secondary">
                Cancel
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default WorkLogForm;
// This code defines a WorkLogForm component that allows users to add or edit work logs.