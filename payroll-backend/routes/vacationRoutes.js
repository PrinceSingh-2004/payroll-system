const express = require('express');
const router = express.Router();
const {
  createVacation,
  getAllVacations,
  getVacationsByEmployee
} = require('../controllers/vacationController');

router.post('/', createVacation);
router.get('/', getAllVacations);
router.get('/employee/:employeeId', getVacationsByEmployee);

module.exports = router;
