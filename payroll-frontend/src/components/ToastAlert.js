// src/components/ToastAlert.js

import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastAlert = ({ open, onClose, severity = 'success', message = '' }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastAlert;
// This component can be used to show success or error messages in various pages.