import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchDashboardCounts } from '../services/dashboardService';
import DashboardCard from '../components/DashboardCard'; // 👈 Import the component

const HomePage = () => {
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const data = await fetchDashboardCounts();
        setCounts(data);
      } catch (err) {
        console.error('Failed to fetch dashboard counts:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCounts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payroll Management Dashboard
      </Typography>
      <Typography variant="body1" component="p">
        Welcome! Monitor and manage employee data, work logs, vacations, and holidays.
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <DashboardCard title="Employees" count={counts?.employees ?? 0} />
          <DashboardCard title="Work Logs" count={counts?.worklogs ?? 0} />
          <DashboardCard title="Vacations" count={counts?.vacations ?? 0} />
          <DashboardCard title="Holidays" count={counts?.holidays ?? 0} />
        </Grid>
      )}

      <Grid container spacing={3}>
        {[
          { title: 'Employees', path: '/employees' },
          { title: 'Work Logs', path: '/worklogs' },
          { title: 'Vacations', path: '/vacations' },
          { title: 'Holidays', path: '/holidays' },
        ].map((section) => (
          <Grid item xs={12} sm={6} md={3} key={section.title}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>{section.title}</Typography>
              <Button
                variant="contained"
                component={Link}
                to={section.path}
                fullWidth
              >
                Manage
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
// This code defines a HomePage component that serves as the main dashboard for the payroll management system.
// It fetches and displays counts of employees, work logs, vacations, and holidays using the DashboardCard component.