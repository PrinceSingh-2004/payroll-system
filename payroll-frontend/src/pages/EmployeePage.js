import React, { useState, useEffect } from 'react';
import { Container, Typography, Divider, CircularProgress, Box } from '@mui/material';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import ConfirmationDialog from '../components/ConfirmationDialog';
import ToastAlert from '../components/ToastAlert';

import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../services/employeeService';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'Failed to fetch employees.', severity: 'error' });
    }
  };

  const handleEdit = (employee) => setSelectedEmployee(employee);

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployee(selectedEmployee.id);
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      setToast({ open: true, message: 'Employee deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'Failed to delete employee.', severity: 'error' });
    } finally {
      setConfirmOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedEmployee) {
        const response = await updateEmployee(selectedEmployee.id, data);
        setEmployees(employees.map(emp => emp.id === response.data.id ? response.data : emp));
        setToast({ open: true, message: 'Employee updated!', severity: 'success' });
      } else {
        const response = await createEmployee(data);
        setEmployees([...employees, response.data]);
        setToast({ open: true, message: 'Employee added!', severity: 'success' });
      }
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'Operation failed.', severity: 'error' });
    } finally {
      setSelectedEmployee(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Employees</Typography>
      <EmployeeForm onSubmit={handleFormSubmit} initialData={selectedEmployee} />
      <Divider sx={{ my: 2 }} />
      <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />

      <ConfirmationDialog
        open={confirmOpen}
        title="Delete Employee"
        content={`Are you sure you want to delete ${selectedEmployee?.name}?`}
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

export default EmployeePage;
// This page manages the employees, allowing users to add, edit, and delete employees.
// It uses a form for input and a list to display existing employees.
// The page also includes confirmation dialogs for delete actions and toast notifications for feedback.
// The component fetches the employee data from the server and updates the state accordingly.