// models/vacation.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Employee = require('./employee');

const Vacation = sequelize.define('Vacation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'vacations',
  timestamps: true,
});

Employee.hasMany(Vacation, { foreignKey: 'employeeId' });
Vacation.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = Vacation;