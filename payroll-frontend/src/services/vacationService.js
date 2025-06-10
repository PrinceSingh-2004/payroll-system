import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/vacations';

export const getAllVacations = () => axios.get(API_BASE);
export const getVacationById = (id) => axios.get(`${API_BASE}/${id}`);
export const createVacation = (vacation) => axios.post(API_BASE, vacation);
export const updateVacation = (id, updatedData) => axios.put(`${API_BASE}/${id}`, updatedData);
export const deleteVacation = (id) => axios.delete(`${API_BASE}/${id}`);
