// src/components/HolidayForm.js

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack
} from '@mui/material';

const HolidayForm = ({ onSubmit, selectedHoliday, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    if (selectedHoliday) {
      setForm(selectedHoliday);
    } else {
      setForm({ name: '', date: '', description: '' });
    }
  }, [selectedHoliday]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.date) {
      onSubmit(form);
      setForm({ name: '', date: '', description: '' });
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        {selectedHoliday ? 'Edit Holiday' : 'Add Holiday'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Holiday Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="primary">
              {selectedHoliday ? 'Update' : 'Add'}
            </Button>
            {selectedHoliday && (
              <Button variant="outlined" color="secondary" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};

export default HolidayForm;


// This component allows users to add or edit holiday details. It includes fields for the holiday name, date, and description.
// The form is submitted with the provided data, and the component can also handle cancellation of edits.