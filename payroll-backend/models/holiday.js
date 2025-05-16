// models/holiday.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Holiday = sequelize.define('Holiday', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'holidays',
  timestamps: true,
});

module.exports = Holiday;
