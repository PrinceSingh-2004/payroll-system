import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider } from '@mui/material';
import WorkLogForm from '../components/WorkLogForm';
import WorkLogList from '../components/WorkLogList';
import ConfirmationDialog from '../components/ConfirmationDialog';
import ToastAlert from '../components/ToastAlert';

import {
  getAllWorklogs,
  createWorklog,
  updateWorklog,
  deleteWorklog,
} from '../services/worklogService';

const WorkLogPage = () => {
  const [worklogs, setWorklogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Fetch worklogs on page load
  useEffect(() => {
    fetchWorklogs();
  }, []);

  const fetchWorklogs = () => {
    getAllWorklogs()
      .then((res) => setWorklogs(res.data))
      .catch(() =>
        setToast({ open: true, message: 'Failed to fetch work logs.', severity: 'error' })
      );
  };

  const handleEdit = (log) => setSelectedLog(log);

  const handleDelete = (log) => {
    setSelectedLog(log);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteWorklog(selectedLog.id)
      .then(() => {
        setToast({ open: true, message: 'Work log deleted successfully!', severity: 'success' });
        fetchWorklogs();
      })
      .catch(() =>
        setToast({ open: true, message: 'Failed to delete work log.', severity: 'error' })
      );
    setConfirmOpen(false);
    setSelectedLog(null);
  };

  const handleFormSubmit = (data) => {
    if (selectedLog) {
      // Update existing work log
      updateWorklog(selectedLog.id, data)
        .then(() => {
          setToast({ open: true, message: 'Work log updated!', severity: 'success' });
          fetchWorklogs();
        })
        .catch(() =>
          setToast({ open: true, message: 'Failed to update work log.', severity: 'error' })
        );
    } else {
      // Create new work log
      createWorklog(data)
        .then(() => {
          setToast({ open: true, message: 'Work log added!', severity: 'success' });
          fetchWorklogs();
        })
        .catch(() =>
          setToast({ open: true, message: 'Failed to add work log.', severity: 'error' })
        );
    }
    setSelectedLog(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Work Logs
      </Typography>
      <WorkLogForm onSubmit={handleFormSubmit} initialData={selectedLog} />
      <Divider sx={{ my: 2 }} />
      <WorkLogList data={worklogs} onEdit={handleEdit} onDelete={handleDelete} />

      <ConfirmationDialog
        open={confirmOpen}
        title="Delete Work Log"
        content={`Are you sure you want to delete the work log on ${selectedLog?.date}?`}
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

export default WorkLogPage;
