import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import WorkLogPage from './pages/WorkLogPage';
import VacationPage from './pages/VacationPage';
import HolidayPage from './pages/HolidayPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/worklogs" element={<WorkLogPage />} />
        <Route path="/vacations" element={<VacationPage />} />
        <Route path="/holidays" element={<HolidayPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
