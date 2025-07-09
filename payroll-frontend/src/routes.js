import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import WorkLogPage from './pages/WorkLogPage';
import VacationPage from './pages/VacationPage';
import HolidayPage from './pages/HolidayPage';
import PayrollPage from './pages/PayrollPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => {
  console.log('AppRoutes rendered');
  
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        
        <Route path="/employees" element={
          <PrivateRoute>
            <EmployeePage />
          </PrivateRoute>
        } />
        
        <Route path="/employees/:id/dashboard" element={
          <PrivateRoute>
            <EmployeeDashboardPage />
          </PrivateRoute>
        } />
        
        <Route path="/worklogs" element={
          <PrivateRoute>
            <WorkLogPage />
          </PrivateRoute>
        } />
        
        <Route path="/vacations" element={
          <PrivateRoute>
            <VacationPage />
          </PrivateRoute>
        } />
        
        <Route path="/holidays" element={
          <PrivateRoute>
            <HolidayPage />
          </PrivateRoute>
        } />
        
        <Route path="/payroll" element={
          <PrivateRoute>
            <PayrollPage />
          </PrivateRoute>
        } />
        
        <Route path="/profile" element={
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        } />
        
        <Route path="/admin/users" element={
          <PrivateRoute>
            <AdminUserManagementPage />
          </PrivateRoute>
        } />
        
        {/* Redirect authenticated users to home */}
        <Route path="/dashboard" element={<Navigate to="/home" replace />} />
        
        {/* Fallback route for debugging */}
        <Route path="*" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <p>Current path: {window.location.pathname}</p>
          </div>
        } />
      </Routes>
  );
};

export default AppRoutes;
