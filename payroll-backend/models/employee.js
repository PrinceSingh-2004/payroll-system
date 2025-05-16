const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('salaried', 'hourly'),
    allowNull: false,
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  hourlyRate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
}, {
  tableName: 'employees',
  timestamps: true,
});

module.exports = Employee;
