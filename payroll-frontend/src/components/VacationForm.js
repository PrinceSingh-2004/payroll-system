// src/components/VacationForm.js

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem
} from '@mui/material';
import { getAllEmployees } from '../services/employeeService';

const VacationForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    startDate: '',
    endDate: ''
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then(res => setEmployees(res.data));
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        employeeId: initialData.employeeId || '',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || ''
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
    setFormData({ employeeId: '', startDate: '', endDate: '' });
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {initialData ? 'Edit Vacation' : 'Add Vacation'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              name="employeeId"
              label="Employee"
              value={formData.employeeId}
              onChange={handleChange}
              fullWidth required
            >
              {employees.map(emp => (
                <MenuItem key={emp.id} value={emp.id}>{emp.fullName}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="startDate"
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              fullWidth required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="endDate"
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              {initialData ? 'Update' : 'Submit'}
            </Button>
            {onCancel && (
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default VacationForm;
// This component is a form for adding or editing vacation records.