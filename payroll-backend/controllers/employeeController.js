const { Employee, WorkLog, Vacation } = require('../models');


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

exports.getEmployeeCount = async (req, res) => {
  try {
    const count = await Employee.count();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.calculatePayroll = async (req, res) => {
  try {
    const { month } = req.query; // format: YYYY-MM
    if (!month) return res.status(400).json({ error: 'Month is required as YYYY-MM' });

    const employees = await Employee.findAll();
    const payroll = [];
    const { Op } = require('sequelize');
    const Holiday = require('../models').Holiday;
    const Vacation = require('../models').Vacation;

    // Get all public holidays for the year
    const [year, monthNum] = month.split('-').map(Number);
    const yearStart = `${year}-01-01`;
    const yearEnd = `${year}-12-31`;
    const holidays = await Holiday.findAll({
      where: {
        date: { [Op.between]: [yearStart, yearEnd] }
      }
    });
    const publicHolidaySet = new Set(holidays.map(h => h.date));

    for (const emp of employees) {
      let pay = 0;
      let vacationDeductions = [];
      if (emp.role === 'salaried') {
        pay = emp.salary || 0;
        // Vacation deduction logic
        // Get all vacations for this employee in the year
        const vacations = await Vacation.findAll({
          where: {
            employeeId: emp.id,
            startDate: { [Op.lte]: `${year}-12-31` },
            endDate: { [Op.gte]: `${year}-01-01` }
          }
        });
        // Quarters: 1: Jan-Mar, 2: Apr-Jun, 3: Jul-Sep, 4: Oct-Dec
        const quarters = [
          { q: 1, start: new Date(year, 0, 1), end: new Date(year, 2, 31) },
          { q: 2, start: new Date(year, 3, 1), end: new Date(year, 5, 30) },
          { q: 3, start: new Date(year, 6, 1), end: new Date(year, 8, 30) },
          { q: 4, start: new Date(year, 9, 1), end: new Date(year, 11, 31) },
        ];
        for (const { q, start, end } of quarters) {
          // Count vacation weekdays in this quarter (excluding weekends and public holidays)
          let totalVacDays = 0;
          for (const vac of vacations) {
            const vacStart = new Date(Math.max(new Date(vac.startDate), start));
            const vacEnd = new Date(Math.min(new Date(vac.endDate), end));
            if (vacStart > vacEnd) continue;
            for (let d = new Date(vacStart); d <= vacEnd; d.setDate(d.getDate() + 1)) {
              const iso = d.toISOString().slice(0, 10);
              if (d.getDay() < 5 && !publicHolidaySet.has(iso)) {
                totalVacDays++;
              }
            }
          }
          if (totalVacDays > 2) {
            const extraDays = totalVacDays - 2;
            // Distribute extra days across the 3 months of the quarter
            for (let m = start.getMonth(); m <= end.getMonth(); m++) {
              const monthStart = new Date(year, m, 1);
              const monthEnd = new Date(year, m + 1, 0);
              // Count working days in this month (excluding weekends and public holidays)
              let workingDays = 0;
              for (let d = new Date(monthStart); d <= monthEnd; d.setDate(d.getDate() + 1)) {
                const iso = d.toISOString().slice(0, 10);
                if (d.getDay() < 5 && !publicHolidaySet.has(iso)) {
                  workingDays++;
                }
              }
              // Distribute extra days
              let daysThisMonth = Math.floor(extraDays / 3);
              if (m === end.getMonth()) daysThisMonth += extraDays % 3;
              // Only deduct if this month is the one being calculated
              if (m + 1 === monthNum && daysThisMonth > 0 && workingDays > 0) {
                const dailySalary = emp.salary / workingDays;
                const deductionAmount = Math.round(dailySalary * daysThisMonth * 100) / 100;
                vacationDeductions.push({
                  month: `${year}-${(m + 1).toString().padStart(2, '0')}`,
                  deduct_days: daysThisMonth,
                  amount: deductionAmount
                });
                pay -= deductionAmount;
              }
            }
          }
        }
      } else if (emp.role === 'hourly') {
        // Get all work logs for this employee in the given month
        const startDate = `${month}-01`;
        const [year, monthNum] = month.split('-').map(Number);
        const lastDay = new Date(year, monthNum, 0).getDate();
        const endDate = `${month}-${lastDay.toString().padStart(2, '0')}`;
        const logs = await WorkLog.findAll({
          where: {
            employeeId: emp.id,
            date: {
              [require('sequelize').Op.between]: [startDate, endDate]
            }
          }
        });
        const totalHours = logs.reduce((sum, log) => sum + (log.hoursWorked || 0), 0);
        pay = (emp.hourlyRate || 0) * totalHours;
      }
      payroll.push({
        employee: {
          id: emp.id,
          fullName: emp.fullName,
          role: emp.role
        },
        pay,
        vacationDeductions
      });
    }
    res.json(payroll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeeSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const { month } = req.query; // Optional: for monthly summary

    // Get employee details
    const employee = await Employee.findByPk(id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    // Get work logs for this employee
    const workLogs = await WorkLog.findAll({
      where: { employeeId: id },
      order: [['date', 'DESC']]
    });

    // Get vacations for this employee
    const vacations = await Vacation.findAll({
      where: { employeeId: id },
      order: [['startDate', 'DESC']]
    });

    // Calculate statistics
    const totalWorkDays = workLogs.length;
    const totalHoursWorked = workLogs.reduce((sum, log) => sum + (log.hoursWorked || 0), 0);
    const totalVacationDays = vacations.reduce((sum, vac) => {
      const start = new Date(vac.startDate);
      const end = new Date(vac.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return sum + days;
    }, 0);

    // Calculate monthly pay and vacation deduction if month is provided
    let monthlyPay = 0;
    let monthlyBasePay = 0;
    let vacationDeduction = 0;
    let vacationDeductionDetails = null;
    if (month) {
      if (employee.role === 'salaried') {
        // Use the same deduction logic as in calculatePayroll
        const { Op } = require('sequelize');
        const Holiday = require('../models').Holiday;
        const [year, monthNum] = month.split('-').map(Number);
        const yearStart = `${year}-01-01`;
        const yearEnd = `${year}-12-31`;
        const holidays = await Holiday.findAll({
          where: {
            date: { [Op.between]: [yearStart, yearEnd] }
          }
        });
        const publicHolidaySet = new Set(holidays.map(h => h.date));
        monthlyBasePay = Math.round((employee.salary || 0) / 12 * 100) / 100;
        monthlyPay = monthlyBasePay;
        // Quarters: 1: Jan-Mar, 2: Apr-Jun, 3: Jul-Sep, 4: Oct-Dec
        const quarters = [
          { q: 1, start: new Date(year, 0, 1), end: new Date(year, 2, 31) },
          { q: 2, start: new Date(year, 3, 1), end: new Date(year, 5, 30) },
          { q: 3, start: new Date(year, 6, 1), end: new Date(year, 8, 30) },
          { q: 4, start: new Date(year, 9, 1), end: new Date(year, 11, 31) },
        ];
        for (const { q, start, end } of quarters) {
          // Only process the quarter containing the selected month
          if (monthNum - 1 < start.getMonth() || monthNum - 1 > end.getMonth()) continue;
          // Count vacation weekdays in this quarter (excluding weekends and public holidays)
          let totalVacDays = 0;
          for (const vac of vacations) {
            const vacStart = new Date(Math.max(new Date(vac.startDate), start));
            const vacEnd = new Date(Math.min(new Date(vac.endDate), end));
            if (vacStart > vacEnd) continue;
            for (let d = new Date(vacStart); d <= vacEnd; d.setDate(d.getDate() + 1)) {
              const iso = d.toISOString().slice(0, 10);
              if (d.getDay() < 5 && !publicHolidaySet.has(iso)) {
                totalVacDays++;
              }
            }
          }
          if (totalVacDays > 2) {
            const extraDays = totalVacDays - 2;
            // Distribute extra days across the 3 months of the quarter
            for (let m = start.getMonth(); m <= end.getMonth(); m++) {
              const monthStart = new Date(year, m, 1);
              const monthEnd = new Date(year, m + 1, 0);
              // Count working days in this month (excluding weekends and public holidays)
              let workingDays = 0;
              for (let d = new Date(monthStart); d <= monthEnd; d.setDate(d.getDate() + 1)) {
                const iso = d.toISOString().slice(0, 10);
                if (d.getDay() < 5 && !publicHolidaySet.has(iso)) {
                  workingDays++;
                }
              }
              // Distribute extra days
              let daysThisMonth = Math.floor(extraDays / 3);
              if (m === end.getMonth()) daysThisMonth += extraDays % 3;
              // Only deduct if this month is the one being calculated
              if (m + 1 === monthNum && daysThisMonth > 0 && workingDays > 0) {
                const dailySalary = (employee.salary || 0) / 12 / workingDays;
                const deductionAmount = Math.round(dailySalary * daysThisMonth * 100) / 100;
                vacationDeduction = deductionAmount;
                vacationDeductionDetails = {
                  month: `${year}-${(m + 1).toString().padStart(2, '0')}`,
                  deduct_days: daysThisMonth,
                  amount: deductionAmount
                };
                monthlyPay -= deductionAmount;
              }
            }
          }
        }
      } else if (employee.role === 'hourly') {
        // Use the same database query method as calculatePayroll for consistency
        const startDate = `${month}-01`;
        const [year, monthNum] = month.split('-').map(Number);
        const lastDay = new Date(year, monthNum, 0).getDate();
        const endDate = `${month}-${lastDay.toString().padStart(2, '0')}`;
        const monthlyLogs = await WorkLog.findAll({
          where: {
            employeeId: id,
            date: {
              [require('sequelize').Op.between]: [startDate, endDate]
            }
          }
        });
        const monthlyHours = monthlyLogs.reduce((sum, log) => sum + (log.hoursWorked || 0), 0);
        monthlyPay = (employee.hourlyRate || 0) * monthlyHours;
      }
    }

    // Get recent work logs (last 10)
    const recentWorkLogs = workLogs.slice(0, 10);

    // Get recent vacations (last 5)
    const recentVacations = vacations.slice(0, 5);

    res.json({
      employee,
      summary: {
        totalWorkDays,
        totalHoursWorked,
        totalVacationDays,
        monthlyPay: month ? monthlyPay : null,
        monthlyBasePay: month ? monthlyBasePay : null,
        vacationDeduction: month ? vacationDeduction : null,
        vacationDeductionDetails: month ? vacationDeductionDetails : null,
        averageHoursPerDay: totalWorkDays > 0 ? (totalHoursWorked / totalWorkDays).toFixed(2) : 0
      },
      recentWorkLogs,
      recentVacations,
      allWorkLogs: workLogs,
      allVacations: vacations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
