import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  useTheme,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  IconButton
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  AccountBalanceWallet,
  Person,
  Logout,
  Settings,
  AdminPanelSettings,
  Work,
  People
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import Snackbar from '@mui/material/Snackbar';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const { user, role, userProfile, logout, isAdmin, isHR } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      console.log('[Navbar] Starting logout process...');
      handleProfileMenuClose();
      
      await logout(() => {
        console.log('[Navbar] Logout callback executed');
        setSnackbarOpen(true);
        navigate('/login');
      });
    } catch (error) {
      console.error('[Navbar] Logout error:', error);
      // Even if logout fails, try to navigate to login
      navigate('/login');
    }
  };

  // Role-based navigation links
  const getNavLinks = () => {
    const baseLinks = [
      { label: 'Home', to: '/home' },
    ];

    if (isAdmin() || isHR()) {
      baseLinks.push(
        { label: 'Employees', to: '/employees' },
        { label: 'Work Logs', to: '/worklogs' },
        { label: 'Vacations', to: '/vacations' },
        { label: 'Holidays', to: '/holidays' },
        { label: 'Payroll', to: '/payroll' }
      );
    } else {
      // Employee links
      baseLinks.push(
        { label: 'Work Logs', to: '/worklogs' },
        { label: 'Vacations', to: '/vacations' }
      );
    }

    // Admin-only links
    if (isAdmin()) {
      baseLinks.push({ label: 'User Management', to: '/admin/users' });
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'hr': return 'warning';
      case 'employee': return 'success';
      default: return 'default';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'hr': return 'HR';
      case 'employee': return 'Employee';
      default: return role;
    }
  };

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={3} sx={{ mb: 2 }}>
        <Toolbar sx={{ minHeight: 64, px: { xs: 1, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <AccountBalanceWallet sx={{ fontSize: 32, mr: 1, color: 'secondary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, color: '#fff' }}>
              PayrollPro
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }}>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                color={location.pathname === link.to ? 'secondary' : 'inherit'}
                component={Link}
                to={link.to}
                sx={{
                  mx: 0.5,
                  fontWeight: location.pathname === link.to ? 700 : 500,
                  bgcolor: location.pathname === link.to ? theme.palette.secondary.light : 'transparent',
                  color: location.pathname === link.to ? theme.palette.primary.main : '#fff',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: theme.palette.secondary.light,
                    color: theme.palette.primary.main,
                  },
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* User Profile Section */}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={getRoleLabel(role)}
                color={getRoleColor(role)}
                size="small"
                variant="filled"
              />
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{ color: '#fff' }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  <Person />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem component={Link} to="/profile" onClick={handleProfileMenuClose}>
                  <Person sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                {isAdmin() && (
                  <MenuItem component={Link} to="/admin/users" onClick={handleProfileMenuClose}>
                    <AdminPanelSettings sx={{ mr: 1 }} />
                    User Management
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Logged out successfully"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default Navbar;
// This code defines a Navbar component using Material-UI's AppBar and Toolbar components.