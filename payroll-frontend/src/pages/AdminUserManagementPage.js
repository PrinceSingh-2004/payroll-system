import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Alert,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton
} from '@mui/material';
import {
  Add,
  Person,
  Email,
  Work,
  Delete,
  Edit
} from '@mui/icons-material';

const AdminUserManagementPage = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

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
      case 'admin': return 'Administrator';
      case 'hr': return 'Human Resources';
      case 'employee': return 'Employee';
      default: return role;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Create New User
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* User Creation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            User creation is currently handled through the signup page. 
            New users can sign up and then have their roles managed here.
          </Alert>
          <Typography variant="body2" color="text.secondary">
            To create a new user:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 1 }}>
            <li>Go to the login page</li>
            <li>Click "Sign Up" tab</li>
            <li>Fill in the user details</li>
            <li>Select the appropriate role</li>
            <li>Complete the signup process</li>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Close
          </Button>
          <Button 
            variant="contained"
            onClick={() => {
              setOpenDialog(false);
              navigate('/');
            }}
          >
            Go to Signup
          </Button>
        </DialogActions>
      </Dialog>

      {/* Users List */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          System Users
        </Typography>
        
        {users.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No users found. Users will appear here after they sign up through the login page.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={getRoleLabel(user.role)}
                      color={getRoleColor(user.role)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* Instructions Card */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Management Guidelines
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • Users can sign up through the login page
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • Roles are assigned during signup
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • Admin users have full system access
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Employee users have read-only access to their own data
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminUserManagementPage; 