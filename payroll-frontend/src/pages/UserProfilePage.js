import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
  Chip,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Person,
  Email,
  Work,
  CalendarToday,
  Edit,
  Save,
  Cancel
} from '@mui/icons-material';

const UserProfilePage = () => {
  const { userProfile, role, isAdmin, isHR } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (userProfile) {
      setEditData({
        email: userProfile.email || '',
        // Add more fields as needed
      });
    }
  }, [userProfile]);

  const handleEdit = () => {
    setEditMode(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditData({
      email: userProfile?.email || '',
    });
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Here you would typically update the user profile
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Profile updated successfully!');
      setEditMode(false);
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  if (!userProfile) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        User Profile
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        {/* Main Profile Card */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight={600}>
                Account Information
              </Typography>
              <Button
                variant="outlined"
                startIcon={editMode ? <Cancel /> : <Edit />}
                onClick={editMode ? handleCancel : handleEdit}
                disabled={loading}
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </Button>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={editMode ? editData.email : userProfile.email}
                  onChange={(e) => editMode && setEditData({ ...editData, email: e.target.value })}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Role"
                  value={getRoleLabel(role)}
                  disabled
                  InputProps={{
                    startAdornment: <Work sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Created"
                  value={formatDate(userProfile.created_at)}
                  disabled
                  InputProps={{
                    startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Sign In"
                  value={formatDate(userProfile.last_sign_in_at)}
                  disabled
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
            </Grid>

            {editMode && (
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : 'Save Changes'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Role & Permissions Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Role & Permissions
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={getRoleLabel(role)}
                  color={getRoleColor(role)}
                  variant="filled"
                  sx={{ mb: 1 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Permissions:</strong>
              </Typography>
              
              <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                {isAdmin() && (
                  <li>Full system access</li>
                )}
                {isHR() && (
                  <li>Manage employees and HR functions</li>
                )}
                <li>View own profile and data</li>
                <li>Access assigned modules</li>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Role-Specific Information */}
      {role === 'employee' && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Employee Information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Additional employee-specific information will be displayed here, including salary details, work hours, and vacation statistics.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default UserProfilePage; 