const { Vacation } = require('../models');

exports.createVacation = async (req, res) => {
  try {
    const vacation = await Vacation.create(req.body);
    res.status(201).json(vacation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllVacations = async (req, res) => {
  try {
    const vacations = await Vacation.findAll();
    res.status(200).json(vacations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVacationsByEmployee = async (req, res) => {
  try {
    const vacations = await Vacation.findAll({ where: { employeeId: req.params.employeeId } });
    res.status(200).json(vacations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVacationCount = async (req, res) => {
  try {
    const count = await Vacation.count();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
