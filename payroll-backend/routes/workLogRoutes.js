const express = require('express');
const router = express.Router();
const {
  createWorkLog,
  getAllWorkLogs,
  getWorkLogsByEmployee
} = require('../controllers/workLogController');

router.post('/', createWorkLog);
router.get('/', getAllWorkLogs);
router.get('/employee/:employeeId', getWorkLogsByEmployee);

module.exports = router;
