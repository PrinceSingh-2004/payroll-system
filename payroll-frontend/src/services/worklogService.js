import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/worklogs`;

export const getAllWorklogs = () => axios.get(API_BASE);
export const getWorklogById = (id) => axios.get(`${API_BASE}/${id}`);
export const createWorklog = (worklog) => axios.post(API_BASE, worklog);
export const updateWorklog = (id, updatedData) => axios.put(`${API_BASE}/${id}`, updatedData);
export const deleteWorklog = (id) => axios.delete(`${API_BASE}/${id}`);
