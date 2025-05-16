// models/workLog.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Employee = require('./employee');

const WorkLog = sequelize.define('WorkLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hoursWorked: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'work_logs',
  timestamps: true,
});

Employee.hasMany(WorkLog, { foreignKey: 'employeeId' });
WorkLog.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = WorkLog;
