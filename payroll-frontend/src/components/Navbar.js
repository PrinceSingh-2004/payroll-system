import React, { useContext } from 'react';
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
import { ThemeContext } from '../contexts/ThemeContext';
import '../toggle.css';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

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

  // Navigation links for all authenticated users
  const navLinks = [
    { label: 'Home', to: '/home' },
    { label: 'Employees', to: '/employees' },
    { label: 'Work Logs', to: '/worklogs' },
    { label: 'Vacations', to: '/vacations' },
    { label: 'Holidays', to: '/holidays' },
    { label: 'Payroll', to: '/payroll' },
    { label: 'User Management', to: '/admin/users' },
  ];

  return (
    <>
      <AppBar position="sticky" elevation={0} className={darkMode ? 'glass-dark' : 'glass'} style={{ background: 'transparent', boxShadow: 'none', backdropFilter: 'blur(16px)' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                color="inherit"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  letterSpacing: 0.01,
                  opacity: location.pathname === link.to ? 1 : 0.82,
                  color: darkMode ? '#f5f5f5' : '#181c24',
                  borderBottom: location.pathname === link.to ? (darkMode ? '2px solid #2e3cff' : '2px solid #181c24') : '2px solid transparent',
                  borderRadius: 0,
                  transition: 'color 0.2s, border-bottom 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    color: darkMode ? '#fff' : '#10131a',
                    borderBottom: darkMode ? '2px solid #2e3cff' : '2px solid #10131a',
                    boxShadow: darkMode
                      ? '0 2px 8px 0 #2e3cff44'
                      : '0 2px 8px 0 #181c2444',
                    background: 'transparent',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
          <div className="toggleWrapper" style={{ marginLeft: 'auto', marginRight: 16 }}>
            <input className="input" id="dn" type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <label className="toggle" htmlFor="dn">
              <span className="toggle__handler">
                <span className="crater crater--1"></span>
                <span className="crater crater--2"></span>
                <span className="crater crater--3"></span>
              </span>
              <span className="star star--1"></span>
              <span className="star star--2"></span>
              <span className="star star--3"></span>
              <span className="star star--4"></span>
              <span className="star star--5"></span>
              <span className="star star--6"></span>
            </label>
          </div>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{ color: darkMode ? '#fff' : '#181c24' }}
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
                <MenuItem component={Link} to="/admin/users" onClick={handleProfileMenuClose}>
                  <AdminPanelSettings sx={{ mr: 1 }} />
                  User Management
                </MenuItem>
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