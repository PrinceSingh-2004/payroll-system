const express = require('express');
const router = express.Router();
const {
  createWorkLog,
  getAllWorkLogs,
  getWorkLogsByEmployee,
  getWorkLogCount
} = require('../controllers/workLogController');

router.post('/', createWorkLog);
router.get('/', getAllWorkLogs);
router.get('/employee/:employeeId', getWorkLogsByEmployee);
router.get('/count', getWorkLogCount);

module.exports = router;
