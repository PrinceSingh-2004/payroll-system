const express = require('express');
const cors = require('cors');
const { syncDB } = require('./models');
const employeeRoutes = require('./routes/employeeRoutes');
const holidayRoutes = require('./routes/holidayRoutes');
const vacationRoutes = require('./routes/vacationRoutes');
const workLogRoutes = require('./routes/workLogRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.send('✅ Payroll backend is running');
});

// API Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/vacations', vacationRoutes);
app.use('/api/worklogs', workLogRoutes);

// Sync DB and start server
syncDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Failed to sync DB or start server:', err);
});
