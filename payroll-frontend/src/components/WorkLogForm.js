// src/components/WorkLogForm.js

import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Paper, Typography
} from '@mui/material';

const WorkLogForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    date: '',
    hours: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        employeeName: initialData.employeeName || '',
        date: initialData.date || '',
        hours: initialData.hours || ''
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
    setFormData({ employeeName: '', date: '', hours: '' });
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
              label="Employee Name"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              fullWidth required
            />
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
              name="hours"
              type="number"
              value={formData.hours}
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