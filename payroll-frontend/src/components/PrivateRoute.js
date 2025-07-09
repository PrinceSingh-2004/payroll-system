import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  if (loading) return <div className={darkMode ? 'glass-dark' : 'glass'} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <div className={darkMode ? 'glass-dark' : 'glass'} style={{ minHeight: '100vh' }}>{children}</div>;
};

export default PrivateRoute; 