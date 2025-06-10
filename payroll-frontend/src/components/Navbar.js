import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Payroll System</Typography>
        <div>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/employees">Employees</Button>
          <Button color="inherit" component={Link} to="/worklogs">Work Logs</Button>
          <Button color="inherit" component={Link} to="/vacations">Vacations</Button>
          <Button color="inherit" component={Link} to="/holidays">Holidays</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
// This code defines a Navbar component using Material-UI's AppBar and Toolbar components.