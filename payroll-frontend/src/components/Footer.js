import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 6,
      py: 2,
      bgcolor: 'background.paper',
      borderTop: '1px solid #e0e0e0',
      textAlign: 'center',
      color: 'text.secondary',
      fontSize: { xs: '0.9rem', sm: '1rem' },
    }}
  >
    <Typography variant="body2">
      &copy; {new Date().getFullYear()} PayrollPro &mdash; All rights reserved.
    </Typography>
  </Box>
);

export default Footer; 