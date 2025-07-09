import React, { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { Container, Paper, Typography, Box, Grid, TextField } from '@mui/material';
import { Email, Work } from '@mui/icons-material';

const UserProfilePage = () => {
  const { user, role } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        User Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className={darkMode ? 'glass-dark' : 'glass'} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight={600}>
                Account Information
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={user.email}
                  disabled
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Role"
                  value={role}
                  disabled
                  InputProps={{
                    startAdornment: <Work sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfilePage; 