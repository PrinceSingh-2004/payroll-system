const { Employee } = require('../models');


exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    await employee.update(req.body);
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    await employee.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
