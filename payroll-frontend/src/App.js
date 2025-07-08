import React, { useEffect, useState } from 'react';
import { Box, Container, CircularProgress, Typography, Button } from '@mui/material';
import { useAuth } from './contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { supabase } from './supabaseClient';
import Snackbar from '@mui/material/Snackbar';

function SupabaseDebug() {
  const [result, setResult] = useState(null);
  useEffect(() => {
    async function testFetch() {
      const { data, error } = await supabase.from('user_roles').select('*');
      setResult({ data, error });
      console.log('Supabase user_roles test:', data, error);
    }
    testFetch();
  }, []);
  if (!result) return <div>Testing Supabase connection...</div>;
  if (result.error) return <div style={{ color: 'red' }}>Supabase error: {result.error.message}</div>;
  return <div>Supabase user_roles: {JSON.stringify(result.data)}</div>;
}

const AppContent = () => {
  const { user, role, loading, roleError, retryRoleFetch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setLoadingTimeout(true);
        setSnackbar({ open: true, message: 'Loading timed out. Please check your connection.', severity: 'error' });
      }
    }, 5000); // 5 second timeout
    return () => clearTimeout(timer);
  }, [loading]);

  // Redirect after login based on role
  useEffect(() => {
    if (user && !loading && !roleError && (location.pathname === '/' || location.pathname === '/login')) {
      if (role === 'admin') {
        navigate('/admin/users');
      } else if (role === 'hr') {
        navigate('/employees');
      } else if (role === 'employee') {
        navigate('/home');
      }
    }
  }, [user, role, loading, roleError, navigate, location]);

  // Show loading while auth is being determined
  if (loading && !loadingTimeout && !roleError) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading PayrollPro...
        </Typography>
      </Box>
    );
  }

  // Show error if loading times out or roleError is set
  if (loadingTimeout || (roleError && user)) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Typography variant="h5" color="error" gutterBottom>
          {roleError ? 'Role Error' : 'Loading Timeout'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {roleError || 'The app is taking too long to load. Please check your internet connection and try refreshing the page.'}
        </Typography>
        <Button variant="contained" onClick={retryRoleFetch} sx={{ mb: 2 }}>
          Retry
        </Button>
        <Button variant="outlined" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      </Box>
    );
  }

  // If not authenticated, show login page
  if (!user) {
    return <AppRoutes />;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {user && <Navbar />}
      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        <AppRoutes />
      </Container>
      {user && <Footer />}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
