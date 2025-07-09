import React, { useContext } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { ThemeContext } from '../contexts/ThemeContext';

const DashboardCard = ({ title, count, icon }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box sx={{ position: 'relative', width: '100%' }}>
        {/* Optional faint coin/glow behind card */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '90%',
            height: '90%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            filter: 'blur(32px)',
            opacity: darkMode ? 0.18 : 0.12,
            background: darkMode
              ? 'radial-gradient(circle, #2e3cff 0%, #181c24 100%)'
              : 'radial-gradient(circle, #e3f0ff 0%, #fff 100%)',
            zIndex: 0,
          }}
        />
        <Paper
          elevation={0}
          className={darkMode ? 'glass-dark' : 'glass'}
          sx={{
            p: 3,
            textAlign: 'center',
            borderRadius: 4,
            fontWeight: 600,
            color: darkMode ? '#f5f5f5' : '#181c24',
            boxShadow: darkMode
              ? '0 4px 32px 0 #2e3cff44, 0 1.5px 8px 0 #0008'
              : '0 4px 32px 0 #e3f0ff44, 0 1.5px 8px 0 #0002',
            transition: 'box-shadow 0.3s, transform 0.3s, filter 0.3s',
            zIndex: 1,
            cursor: 'pointer',
            '&:hover': {
              boxShadow: darkMode
                ? '0 8px 48px 0 #2e3cff66, 0 2px 12px 0 #000a'
                : '0 8px 48px 0 #e3f0ff66, 0 2px 12px 0 #0004',
              filter: 'blur(0.5px) brightness(1.04)',
              transform: 'scale(1.035)',
            },
          }}
        >
          {icon && <Box sx={{ mb: 1 }}>{icon}</Box>}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: darkMode ? '#fff' : '#181c24' }}>{title}</Typography>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 800 }}>{count}</Typography>
        </Paper>
      </Box>
    </Grid>
  );
};

export default DashboardCard;
