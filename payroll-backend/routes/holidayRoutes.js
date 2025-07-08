const express = require('express');
const router = express.Router();
const {
  createHoliday,
  getAllHolidays,
  getHolidayCount
} = require('../controllers/holidayController');

router.post('/', createHoliday);
router.get('/', getAllHolidays);
router.get('/count', getHolidayCount);

module.exports = router;
