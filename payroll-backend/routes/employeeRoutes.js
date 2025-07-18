const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeCount,
  calculatePayroll,
  getEmployeeSummary,
} = require('../controllers/employeeController');

router.post('/', createEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/count', getEmployeeCount);
router.get('/payroll/calculate', calculatePayroll);
router.get('/:id/summary', getEmployeeSummary);

module.exports = router;
     