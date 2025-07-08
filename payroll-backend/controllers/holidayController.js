const { Holiday } = require('../models');

exports.createHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.create(req.body);
    res.status(201).json(holiday);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.findAll();
    res.status(200).json(holidays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHolidayCount = async (req, res) => {
  try {
    const count = await Holiday.count();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
