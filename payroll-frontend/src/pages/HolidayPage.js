import React, { useState, useEffect } from 'react';
import { Container, Typography, Divider } from '@mui/material';
import HolidayForm from '../components/HolidayForm';
import HolidayList from '../components/HolidayList';
import ConfirmationDialog from '../components/ConfirmationDialog';
import ToastAlert from '../components/ToastAlert';

import {
  getAllHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from '../services/holidayService';

const HolidayPage = () => {
  const [holidays, setHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await getAllHolidays();
      setHolidays(response.data);
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'Failed to fetch holidays.', severity: 'error' });
    }
  };

  const handleEdit = (holiday) => setSelectedHoliday(holiday);

  const handleDelete = (holiday) => {
    setSelectedHoliday(holiday);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteHoliday(selectedHoliday.id);
      setHolidays(holidays.filter(h => h.id !== selectedHoliday.id));
      setToast({ open: true, message: 'Holiday deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'Failed to delete holiday.', severity: 'error' });
    } finally {
      setConfirmOpen(false);
      setSelectedHoliday(null);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedHoliday) {
        const response = await updateHoliday(selectedHoliday.id, data);
        setHolidays(holidays.map(h => h.id === response.data.id ? response.data : h));
        setToast({ open: true, message: 'Holiday updated!', severity: 'success' });
      } else {
        const response = await createHoliday(data);
        setHolidays([...holidays, response.data]);
        setToast({ open: true, message: 'Holiday added!', severity: 'success' });
      }
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'Operation failed.', severity: 'error' });
    } finally {
      setSelectedHoliday(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Holidays</Typography>
      <HolidayForm onSubmit={handleFormSubmit} initialData={selectedHoliday} />
      <Divider sx={{ my: 2 }} />
      <HolidayList holidays={holidays} onEdit={handleEdit} onDelete={handleDelete} />

      <ConfirmationDialog
        open={confirmOpen}
        title="Delete Holiday"
        content={`Are you sure you want to delete ${selectedHoliday?.name || ''}?`}
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

export default HolidayPage;
