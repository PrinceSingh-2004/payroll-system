import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: 'rgba(255,255,255,0.35)',
      paper: 'rgba(255,255,255,0.55)',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(16px)',
          borderRadius: 18,
          border: '1px solid rgba(255,255,255,0.18)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'rgba(30,34,40,0.35)',
      paper: 'rgba(30,34,40,0.55)',
    },
    text: {
      primary: '#fff',
      secondary: '#bbb',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(30,34,40,0.35)',
          backdropFilter: 'blur(16px)',
          borderRadius: 18,
          border: '1px solid rgba(40,40,60,0.18)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(30,34,40,0.25)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 