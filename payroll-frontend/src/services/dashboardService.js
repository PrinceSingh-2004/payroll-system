import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchDashboardCounts = async () => {
  const [emp, work, vac, hol] = await Promise.all([
    axios.get(`${API_BASE}/employees/count`),
    axios.get(`${API_BASE}/worklogs/count`),
    axios.get(`${API_BASE}/vacations/count`),
    axios.get(`${API_BASE}/holidays/count`)
  ]);

  return {
    employees: emp.data.count,
    worklogs: work.data.count,
    vacations: vac.data.count,
    holidays: hol.data.count,
  };
};
