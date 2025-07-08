import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const DashboardCard = ({ title, count, icon }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
      {icon && <Box sx={{ mb: 1 }}>{icon}</Box>}
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" color="primary">{count}</Typography>
    </Paper>
  </Grid>
);

export default DashboardCard;
