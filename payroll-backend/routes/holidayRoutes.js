const express = require('express');
const router = express.Router();
const {
  createHoliday,
  getAllHolidays
} = require('../controllers/holidayController');

router.post('/', createHoliday);
router.get('/', getAllHolidays);

module.exports = router;
