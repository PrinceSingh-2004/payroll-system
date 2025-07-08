import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { calculatePayroll } from '../services/employeeService';

const PayrollPage = () => {
  const [month, setMonth] = useState('');
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await calculatePayroll(month);
      setPayroll(res.data);
    } catch (err) {
      setError('Failed to fetch payroll.');
      setPayroll([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom fontWeight={700}>Payroll Calculation</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          label="Month"
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleFetch} disabled={!month || loading}>
          Calculate Payroll
        </Button>
      </Paper>
      {error && <Typography color="error">{error}</Typography>}
      {payroll.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Base Pay (₹)</TableCell>
                <TableCell>Vacation Deduction (₹)</TableCell>
                <TableCell>Final Pay (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payroll.map((row) => {
                let basePay = 0;
                let deduction = 0;
                let finalPay = row.pay;
                if (row.employee.role === 'salaried') {
                  basePay = Math.round((row.pay + (row.vacationDeductions && row.vacationDeductions.length > 0 ? row.vacationDeductions[0].amount : 0)) / 12 * 100) / 100;
                  deduction = row.vacationDeductions && row.vacationDeductions.length > 0 ? row.vacationDeductions[0].amount : 0;
                  finalPay = basePay - deduction;
                } else {
                  basePay = finalPay;
                  deduction = 0;
                }
                return (
                  <TableRow key={row.employee.id}>
                    <TableCell>{row.employee.fullName}</TableCell>
                    <TableCell>{row.employee.role}</TableCell>
                    <TableCell>₹ {basePay.toLocaleString('en-IN')}</TableCell>
                    <TableCell>{deduction > 0 ? `- ₹ ${deduction.toLocaleString('en-IN')}` : '—'}</TableCell>
                    <TableCell><b>₹ {finalPay.toLocaleString('en-IN')}</b></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default PayrollPage; 