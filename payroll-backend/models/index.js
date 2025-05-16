// models/index.js
const { sequelize } = require('../config/database');
const Employee = require('./employee');
const Holiday = require('./holiday');
const Vacation = require('./vacation');
const WorkLog = require('./workLog');

const syncDB = async () => {
  await sequelize.sync({ alter: true });
  console.log("All models synchronized.");
};

module.exports = {
  Employee,
  Holiday,
  Vacation,
  WorkLog,
  syncDB,
};
