import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { TextField, Button, Box, Typography, Alert, MenuItem, Tabs, Tab } from '@mui/material';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  console.log('LoginPage rendered');

  // Helper: Assign role if missing after login
  const assignRoleIfMissing = async (userId, role) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
    if (!data) {
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role }]);
      if (insertError) {
        setError('Role assignment failed: ' + insertError.message);
      }
    }
  };

  const handleLogin = async () => {
    console.log('Attempting login with:', email);
    setError('');
    setMessage('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Login error:', error);
        setError(error.message);
      } else {
        console.log('Login successful:', data);
        setMessage('Login successful!');
        // On first login, assign role if missing (using localStorage)
        const user = data.user;
        const pendingRole = localStorage.getItem('pending_role');
        if (user && pendingRole) {
          await assignRoleIfMissing(user.id, pendingRole);
          localStorage.removeItem('pending_role');
        }
      }
    } catch (err) {
      console.error('Login exception:', err);
      setError('Login failed: ' + err.message);
    }
  };

  const handleSignup = async () => {
    console.log('Attempting signup with:', email, role);
    setError('');
    setMessage('');
    
    try {
      // Store the selected role in localStorage for use after email confirmation
      localStorage.setItem('pending_role', role);
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { emailRedirectTo: window.location.origin }
      });
      
      if (error) {
        console.error('Signup error:', error);
        setError(error.message);
        localStorage.removeItem('pending_role');
        return;
      }
      
      console.log('Signup successful:', data);
      setMessage('Signup successful! Please check your email to confirm your account, then log in.');
    } catch (err) {
      console.error('Signup exception:', err);
      setError('Signup failed: ' + err.message);
      localStorage.removeItem('pending_role');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
    setMessage('');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        PayrollPro
      </Typography>
      
      <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

      {activeTab === 0 ? (
        // Login Form
        <Box>
          <TextField 
            label="Email" 
            fullWidth 
            margin="normal" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <TextField 
            label="Password" 
            type="password" 
            fullWidth 
            margin="normal" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2 }} 
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      ) : (
        // Signup Form
        <Box>
          <TextField 
            label="Email" 
            fullWidth 
            margin="normal" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <TextField 
            label="Password" 
            type="password" 
            fullWidth 
            margin="normal" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <TextField
            select
            label="Role"
            fullWidth
            margin="normal"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2 }} 
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LoginPage; 