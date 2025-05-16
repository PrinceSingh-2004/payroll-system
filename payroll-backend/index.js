const express = require('express');
const dotenv = require('dotenv');
const { syncDB } = require('./models');
const { testConnection } = require('./config/database'); // Import testConnection

const employeeRoutes = require('./routes/employeeRoutes');
const workLogRoutes = require('./routes/workLogRoutes');
const vacationRoutes = require('./routes/vacationRoutes');
const holidayRoutes = require('./routes/holidayRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// Test DB connection
testConnection();

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/worklogs', workLogRoutes);
app.use('/api/vacations', vacationRoutes);
app.use('/api/holidays', holidayRoutes);

// DB sync and start server
syncDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
