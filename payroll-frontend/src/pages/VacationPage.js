import React, { useState, useEffect } from 'react';
import { Container, Typography, Divider, CircularProgress, Box } from '@mui/material';
import VacationForm from '../components/VacationForm';
import VacationList from '../components/VacationList';
import ConfirmationDialog from '../components/ConfirmationDialog';
import ToastAlert from '../components/ToastAlert';

import {
  getAllVacations,
  createVacation,
  updateVacation,
  deleteVacation,
} from '../services/vacationService';
import { getAllEmployees } from '../services/employeeService';

const VacationPage = () => {
  const [vacations, setVacations] = useState([]);
  const [selectedVacation, setSelectedVacation] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchVacations();
    getAllEmployees().then(res => setEmployees(res.data));
  }, []);

  const fetchVacations = async () => {
    setLoading(true);
    try {
      const response = await getAllVacations();
      setVacations(response.data);
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'Failed to fetch vacations.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vacation) => setSelectedVacation(vacation);

  const handleDelete = (vacation) => {
    setSelectedVacation(vacation);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteVacation(selectedVacation.id);
      setVacations(vacations.filter(v => v.id !== selectedVacation.id));
      setToast({ open: true, message: 'Vacation deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'Failed to delete vacation.', severity: 'error' });
    } finally {
      setConfirmOpen(false);
      setSelectedVacation(null);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedVacation) {
        const response = await updateVacation(selectedVacation.id, data);
        setVacations(vacations.map(v => v.id === response.data.id ? response.data : v));
        setToast({ open: true, message: 'Vacation updated!', severity: 'success' });
      } else {
        const response = await createVacation(data);
        setVacations([...vacations, response.data]);
        setToast({ open: true, message: 'Vacation added!', severity: 'success' });
      }
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'Operation failed.', severity: 'error' });
    } finally {
      setSelectedVacation(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom fontWeight={700}>Vacations</Typography>
      <VacationForm onSubmit={handleFormSubmit} initialData={selectedVacation} />
      <Divider sx={{ my: 2 }} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <VacationList vacations={vacations} employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <ConfirmationDialog
        open={confirmOpen}
        title="Delete Vacation"
        content={`Are you sure you want to delete vacation for ${selectedVacation?.employee || ''}?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />

      <ToastAlert
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        severity={toast.severity}
        message={toast.message}
      />
    </Container>
  );
};

export default VacationPage;
