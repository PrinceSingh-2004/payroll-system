import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './glass.css';
import './toggle.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';

function BodyClassManager({ children }) {
  const { darkMode } = React.useContext(ThemeContext);
  React.useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(darkMode ? 'theme-dark' : 'theme-light');
  }, [darkMode]);
  return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <BodyClassManager>
          <CssBaseline />
          <App />
        </BodyClassManager>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
