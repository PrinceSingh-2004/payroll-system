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
    name: '',
    email: '',
    role: '',
    salaryType: '',
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee);
    setEmployee({ name: '', email: '', role: '', salaryType: '' });
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
              label="Name"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={employee.role}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Salary Type"
              name="salaryType"
              value={employee.salaryType}
              onChange={handleChange}
              required
            >
              <MenuItem value="salaried">Salaried</MenuItem>
              <MenuItem value="hourly">Hourly</MenuItem>
            </TextField>
          </Grid>
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