const { WorkLog } = require('../models');

exports.createWorkLog = async (req, res) => {
  try {
    const workLog = await WorkLog.create(req.body);
    res.status(201).json(workLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllWorkLogs = async (req, res) => {
  try {
    const logs = await WorkLog.findAll();
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWorkLogsByEmployee = async (req, res) => {
  try {
    const logs = await WorkLog.findAll({ where: { employeeId: req.params.employeeId } });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
