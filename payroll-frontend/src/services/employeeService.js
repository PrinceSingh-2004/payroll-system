import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/employees';

export const getAllEmployees = () => axios.get(API_BASE);
export const getEmployeeById = (id) => axios.get(`${API_BASE}/${id}`);
export const createEmployee = (employee) => axios.post(API_BASE, employee);
export const updateEmployee = (id, updatedData) => axios.put(`${API_BASE}/${id}`, updatedData);
export const deleteEmployee = (id) => axios.delete(`${API_BASE}/${id}`);
