import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Deep blue
    },
    secondary: {
      main: '#00bfae', // Teal accent
    },
    background: {
      default: '#f7f9fb', // Very light neutral
      paper: '#fff',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: 0.5 },
    h2: { fontWeight: 700, fontSize: '2rem', letterSpacing: 0.5 },
    h3: { fontWeight: 600, fontSize: '1.5rem' },
    h4: { fontWeight: 600, fontSize: '1.25rem' },
    h5: { fontWeight: 500, fontSize: '1.1rem' },
    h6: { fontWeight: 500, fontSize: '1rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.95rem' },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: '#f0f4f8',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
