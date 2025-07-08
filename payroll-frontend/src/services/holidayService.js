import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/holidays`;

export const getAllHolidays = () => axios.get(API_BASE);
export const getHolidayById = (id) => axios.get(`${API_BASE}/${id}`);
export const createHoliday = (holiday) => axios.post(API_BASE, holiday);
export const updateHoliday = (id, updatedData) => axios.put(`${API_BASE}/${id}`, updatedData);
export const deleteHoliday = (id) => axios.delete(`${API_BASE}/${id}`);
