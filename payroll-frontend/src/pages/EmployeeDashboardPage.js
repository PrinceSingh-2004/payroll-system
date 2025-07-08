import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import {
  Person,
  Work,
  Event,
  AttachMoney,
  TrendingUp,
  CalendarToday,
  AccessTime
} from '@mui/icons-material';
import { getEmployeeSummary } from '../services/employeeService';

const EmployeeDashboardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showDeductionInfo, setShowDeductionInfo] = useState(false);

  useEffect(() => {
    fetchEmployeeData();
  }, [id, selectedMonth]);

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getEmployeeSummary(id, selectedMonth);
      setEmployeeData(response.data);
    } catch (err) {
      setError('Failed to fetch employee data.');
      console.error('Error fetching employee data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const formatCurrency = (amount) => {
    return `₹ ${amount?.toLocaleString('en-IN') || '0'}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        <Button onClick={() => navigate('/employees')} sx={{ mt: 2 }}>
          Back to Employees
        </Button>
      </Container>
    );
  }

  if (!employeeData) {
    return (
      <Container>
        <Alert severity="warning" sx={{ mt: 2 }}>Employee not found</Alert>
        <Button onClick={() => navigate('/employees')} sx={{ mt: 2 }}>
          Back to Employees
        </Button>
      </Container>
    );
  }

  const { employee, summary, recentWorkLogs, recentVacations } = employeeData;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button onClick={() => navigate('/employees')} sx={{ mb: 2 }}>
          ← Back to Employees
        </Button>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Employee Dashboard
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          {employee.fullName}
        </Typography>
        <Chip 
          label={employee.role} 
          color={employee.role === 'salaried' ? 'primary' : 'secondary'}
          sx={{ mr: 1 }}
        />
        <Chip 
          label={employee.role === 'salaried' ? `₹${employee.salary?.toLocaleString('en-IN')}/year` : `₹${employee.hourlyRate}/hour`}
          variant="outlined"
        />
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Work color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Work Days</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {summary.totalWorkDays}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTime color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Hours</Typography>
              </Box>
              <Typography variant="h4" color="secondary">
                {summary.totalHoursWorked.toFixed(1)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Event color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Vacation Days</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {summary.totalVacationDays}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Avg Hours/Day</Typography>
              </Box>
              <Typography variant="h4" color="info.main">
                {summary.averageHoursPerDay}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Pay Calculator */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Monthly Pay Calculator
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            label="Select Month"
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            size="small"
          />
          <Button 
            variant="contained" 
            onClick={fetchEmployeeData}
            disabled={!selectedMonth}
          >
            Calculate
          </Button>
        </Box>
        {summary.monthlyPay !== null && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AttachMoney color="success" />
              <Typography variant="h5" color="success.main">
                Final Pay: {formatCurrency(summary.monthlyPay)}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" color="text.secondary">
                  Monthly Base Pay:
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  {formatCurrency(summary.monthlyBasePay)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" color="text.secondary">
                  Vacation Deductions:
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} color={summary.vacationDeduction > 0 ? 'error.main' : 'text.primary'}>
                  {summary.vacationDeduction > 0
                    ? `- ${formatCurrency(summary.vacationDeduction)}`
                    : '—'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" color="text.secondary">
                  Final Pay:
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} color="success.main">
                  {formatCurrency(summary.monthlyPay)}
                </Typography>
              </Grid>
            </Grid>
            {/* Deduction explanation */}
            <Box sx={{ mt: 2 }}>
              <Button
                size="small"
                variant="outlined"
                sx={{ textTransform: 'none' }}
                onClick={() => setShowDeductionInfo((prev) => !prev)}
              >
                {showDeductionInfo ? 'Hide' : 'What is this deduction?'}
              </Button>
              {showDeductionInfo && (
                <Paper elevation={0} sx={{ p: 2, mt: 1, background: '#f5f5f5' }}>
                  <Typography variant="body2">
                    <b>Vacation Deduction Policy:</b> Every employee gets <b>2 free vacation weekdays per quarter</b> (Jan–Mar, Apr–Jun, Jul–Sep, Oct–Dec). If you exceed this, deductions apply based on the number of extra days, distributed across the 3 months of the quarter. Deductions are calculated using your monthly base salary and the number of working days in the month. Public holidays and weekends are not counted as vacation days.
                  </Typography>
                  {summary.vacationDeductionDetails && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        <b>This month:</b> {summary.vacationDeductionDetails.deduct_days} extra vacation day(s) deducted, totaling {formatCurrency(summary.vacationDeductionDetails.amount)}.
                      </Typography>
                    </Box>
                  )}
                </Paper>
              )}
            </Box>
          </Box>
        )}
      </Paper>

      {/* Recent Work Logs */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Work Logs
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentWorkLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{formatDate(log.date)}</TableCell>
                    <TableCell>{log.hoursWorked} hrs</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Recent Vacations */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Vacations
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Days</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentVacations.map((vacation) => {
                  const start = new Date(vacation.startDate);
                  const end = new Date(vacation.endDate);
                  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
                  return (
                    <TableRow key={vacation.id}>
                      <TableCell>{formatDate(vacation.startDate)}</TableCell>
                      <TableCell>{formatDate(vacation.endDate)}</TableCell>
                      <TableCell>{days} days</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployeeDashboardPage; 