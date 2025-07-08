import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';

const EmployeeForm = ({ onSubmit }) => {
  const [employee, setEmployee] = useState({
    fullName: '',
    role: '',
    salary: '',
    hourlyRate: '',
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only send relevant fields
    const payload = {
      fullName: employee.fullName,
      role: employee.role,
      salary: employee.role === 'salaried' ? parseFloat(employee.salary) : null,
      hourlyRate: employee.role === 'hourly' ? parseFloat(employee.hourlyRate) : null,
    };
    onSubmit(payload);
    setEmployee({ fullName: '', role: '', salary: '', hourlyRate: '' });
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={employee.fullName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Role"
              name="role"
              value={employee.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="salaried">Salaried</MenuItem>
              <MenuItem value="hourly">Hourly</MenuItem>
            </TextField>
          </Grid>
          {employee.role === 'salaried' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                type="number"
                value={employee.salary}
                onChange={handleChange}
                required
              />
            </Grid>
          )}
          {employee.role === 'hourly' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hourly Rate"
                name="hourlyRate"
                type="number"
                value={employee.hourlyRate}
                onChange={handleChange}
                required
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EmployeeForm;
// This component is a form for adding new employees. It uses Material-UI components for styling and layout.