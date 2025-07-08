import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/employees`;

export const getAllEmployees = () => axios.get(API_BASE);
export const getEmployeeById = (id) => axios.get(`${API_BASE}/${id}`);
export const createEmployee = (employee) => axios.post(API_BASE, employee);
export const updateEmployee = (id, updatedData) => axios.put(`${API_BASE}/${id}`, updatedData);
export const deleteEmployee = (id) => axios.delete(`${API_BASE}/${id}`);
export const calculatePayroll = (month) => axios.get(`${API_BASE}/payroll/calculate?month=${month}`);
export const getEmployeeSummary = (id, month = null) => {
  const url = month 
    ? `${API_BASE}/${id}/summary?month=${month}`
    : `${API_BASE}/${id}/summary`;
  return axios.get(url);
};
