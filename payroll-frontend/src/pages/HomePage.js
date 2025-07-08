import React from 'react';
import { Box, Typography, Paper, Stack, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountBalanceWallet, People, Work, BeachAccess, EventAvailable, TrendingUp } from '@mui/icons-material';

const modules = [
  {
    title: 'Employees',
    icon: <People color="primary" sx={{ fontSize: 40 }} />,
    path: '/employees',
    desc: 'Manage employee records, roles, and pay rates.'
  },
  {
    title: 'Work Logs',
    icon: <Work color="secondary" sx={{ fontSize: 40 }} />,
    path: '/worklogs',
    desc: 'Track daily work hours for each employee.'
  },
  {
    title: 'Vacations',
    icon: <BeachAccess color="info" sx={{ fontSize: 40 }} />,
    path: '/vacations',
    desc: 'Manage employee vacation requests and history.'
  },
  {
    title: 'Holidays',
    icon: <EventAvailable color="success" sx={{ fontSize: 40 }} />,
    path: '/holidays',
    desc: 'View and manage company holidays.'
  },
  {
    title: 'Payroll',
    icon: <TrendingUp color="warning" sx={{ fontSize: 40 }} />,
    path: '/payroll',
    desc: 'Calculate and review payroll for all employees.'
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', py: 4 }}>
      {/* Hero Section */}
      <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, maxWidth: 600, width: '100%', textAlign: 'center', borderRadius: 4, mb: 5 }}>
        <Stack spacing={2} alignItems="center">
          <AccountBalanceWallet color="primary" sx={{ fontSize: 60 }} />
          <Typography variant="h2" fontWeight={700} gutterBottom>
            PayrollPro
          </Typography>
          <Typography variant="h6" color="text.secondary">
            A modern payroll management system for employees, work logs, holidays, vacations, and payroll calculation.
          </Typography>
        </Stack>
      </Paper>

      {/* Modules Grid */}
      <Grid container spacing={4} justifyContent="center" maxWidth={900}>
        {modules.map((mod) => (
          <Grid item xs={12} sm={6} md={4} key={mod.title}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ mb: 1 }}>{mod.icon}</Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>{mod.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{mod.desc}</Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate(mod.path)}
                sx={{ mt: 'auto', fontWeight: 600, borderRadius: 2, minWidth: 120 }}
              >
                Go to {mod.title}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
// This code defines a HomePage component that serves as the main dashboard for the payroll management system.
// It fetches and displays counts of employees, work logs, vacations, and holidays using the DashboardCard component.