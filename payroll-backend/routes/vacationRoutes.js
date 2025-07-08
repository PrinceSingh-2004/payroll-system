const express = require('express');
const router = express.Router();
const {
  createVacation,
  getAllVacations,
  getVacationsByEmployee,
  getVacationCount
} = require('../controllers/vacationController');

router.post('/', createVacation);
router.get('/', getAllVacations);
router.get('/employee/:employeeId', getVacationsByEmployee);
router.get('/count', getVacationCount);

module.exports = router;
