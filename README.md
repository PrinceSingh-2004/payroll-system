# Payroll System – Complete Documentation

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Architecture & Technology Stack](#architecture--technology-stack)  
3. [Database Schema](#database-schema)  
4. [Implemented Features](#implemented-features)  
5. [Planned/Upcoming Features](#plannedupcoming-features)  
6. [Project Structure](#project-structure)  
7. [Setup & Installation (from Zero)](#setup--installation-from-zero)  
8. [Environment Variables](#environment-variables)  
9. [Running the Project](#running-the-project)  
10. [How to Use the System](#how-to-use-the-system)  
11. [API Endpoints](#api-endpoints)  
12. [Payroll Calculation Logic](#payroll-calculation-logic)  
13. [Individual Employee Dashboard](#individual-employee-dashboard)  
14. [Troubleshooting & FAQ](#troubleshooting--faq)  
15. [Extending the System](#extending-the-system)  
16. [References](#references)  

---

## 1. Project Overview

The Payroll System is a full-stack web application designed to manage employee records, holidays, vacations, and work logs, with a robust backend powered by Supabase (Postgres) and a modern React frontend.  
It is built for extensibility, allowing for future payroll automation, payslip generation, tax compliance, and more.

---

## 2. Architecture & Technology Stack

- **Frontend:** React (Material-UI, Axios)
- **Backend:** Node.js, Express, Sequelize ORM
- **Database:** Supabase (Postgres)
- **Python Utility:** Standalone script for direct DB access (psycopg2)
- **API:** RESTful, CORS-enabled
- **Dev Tools:** Postman, VS Code, npm, pip, virtualenv

---

## 3. Database Schema

**Supabase Tables:**

- **employees**
  - id (PK, int)
  - fullName (varchar)
  - role (enum: 'salaried', 'hourly')
  - salary (float)
  - hourlyRate (float)
  - createdAt, updatedAt (timestamptz)

- **holidays**
  - id (PK, int)
  - name (varchar)
  - date (date)
  - createdAt, updatedAt (timestamptz)

- **vacations**
  - id (PK, int)
  - employeeId (FK, int)
  - startDate (date)
  - endDate (date)
  - createdAt, updatedAt (timestamptz)

- **work_logs**
  - id (PK, int)
  - employeeId (FK, int)
  - date (date)
  - hoursWorked (float)
  - createdAt, updatedAt (timestamptz)

---

## 4. Implemented Features

- **Employee Management:** Add, edit, delete, and list employees (salaried/hourly).
- **Holiday Management:** Add, edit, delete, and list holidays.
- **Vacation Management:** Add, edit, delete, and list vacations for employees.
- **Work Log Management:** Add, edit, delete, and list work logs for employees.
- **Modern React UI:** Responsive, Material-UI, error handling, and feedback.
- **Backend API:** RESTful, CORS-enabled, JSON body parsing, Sequelize ORM.
- **Supabase Integration:** Secure, scalable Postgres database.
- **Python Utility:** Direct DB access for admin scripts or analytics.
- **Payroll Calculation:** Automated salary/wage calculation per pay period.
- **Individual Employee Dashboard:** View detailed summary, recent work logs, vacations, and monthly pay for each employee.

---

## 5. Planned/Upcoming Features

- **Payslip Generation:** Downloadable payslips for employees.
- **Tax & Deduction Handling:** PF, ESI, TDS, and other statutory deductions.
- **Reporting & Analytics:** Payroll summaries, tax reports, cost analysis.
- **Employee Self-Service:** Employee login, payslip/leave access.
- **Automated Bank Transfers:** Salary disbursement integration.
- **Authentication & Authorization:** Secure login for admins/employees.

---

## 6. Project Structure

```
payroll-system/
  payroll-backend/         # Node.js/Express backend
    .env                   # Backend environment variables
    config/
    controllers/
    models/
    routes/
    server.js
    package.json
  payroll-frontend/        # React frontend
    .env                   # Frontend environment variables
    src/
    public/
    package.json
  main.py                  # Python DB utility script
  .env                     # Python script environment variables
  README.md                # This documentation
```

---

## 7. Setup & Installation (from Zero)

### A. Prerequisites
- Node.js (v18+)
- npm
- Python 3.8+
- Supabase account & project
- Postman (optional)

### B. Supabase Setup
1. **Create a new project** at [Supabase](https://app.supabase.com/).
2. **Get your project ref and database password** from the dashboard.
3. **Create tables** as per the schema above (use Supabase Table Editor or SQL).
4. **Enable Row Level Security (RLS)** as needed for development.

### C. Backend Setup
1. **Navigate to backend folder:**
   ```sh
   cd payroll-backend
   ```
2. **Create `.env` file**:
   ```
   DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-0-us-east-2.pooler.supabase.com:6543/postgres
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Start the backend:**
   ```sh
   npm run dev
   ```
   You should see:
   ```
   🚀 Server running on port 5000
   ✅ Connection to the database has been established successfully.
   ```

### D. Frontend Setup
1. **Navigate to frontend folder:**
   ```sh
   cd payroll-frontend
   ```
2. **Create `.env` file**:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Start the frontend:**
   ```sh
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000).

### E. Python Script Setup
1. **Ensure `main.py` and its `.env` are in the same directory (project root).**
2. **Create `.env` file**:
   ```
   user=postgres.<project-ref>
   password=<password>
   host=aws-0-us-east-2.pooler.supabase.com
   port=6543
   ```
3. **Create and activate a virtual environment:**
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```
4. **Install dependencies:**
   ```sh
   pip install python-dotenv psycopg2-binary
   ```
5. **Run the script:**
   ```sh
   python main.py
   ```

---

## 8. Environment Variables

### Backend (`payroll-backend/.env`):
```
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-0-us-east-2.pooler.supabase.com:6543/postgres
```

### Frontend (`payroll-frontend/.env`):
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### Python Script (`.env` in project root):
```
user=postgres.<project-ref>
password=<password>
host=aws-0-us-east-2.pooler.supabase.com
port=6543
dbname=postgres
```

---

## 9. Running the Project

**Backend:**
```sh
cd payroll-backend
npm run dev
```

**Frontend:**
```sh
cd payroll-frontend
npm start
```

**Python Script:**
```sh
cd <project-root>
source venv/bin/activate
python main.py
```

---

## 10. How to Use the System

- **Add Employees:** Use the frontend form. Choose "salaried" or "hourly" and enter the appropriate pay.
- **Add Holidays:** Use the frontend form. Enter holiday name and date.
- **Add Vacations:** Use the frontend form. Select an employee, enter start and end dates.
- **Add Work Logs:** Use the frontend form. Select an employee, enter date and hours worked.
- **View/Edit/Delete:** All modules support full CRUD via the frontend.
- **API Testing:** Use Postman or curl to test endpoints (see below).
- **Python Script:** Use for direct DB queries or admin tasks.

---

## 11. API Endpoints

| Method | Endpoint                                      | Description                                 | Body Example                |
|--------|-----------------------------------------------|---------------------------------------------|-----------------------------|
| GET    | /api/employees                                | List all employees                          |                             |
| POST   | /api/employees                                | Add employee                                | `{ "fullName": "...", ...}` |
| GET    | /api/employees/:id                            | Get employee by ID                          |                             |
| GET    | /api/employees/:id/summary                    | Get employee summary (optionally by month)  |                             |
| GET    | /api/employees/payroll/calculate?month=YYYY-MM| Calculate payroll for all employees (month) |                             |
| GET    | /api/holidays                                 | List all holidays                           |                             |
| POST   | /api/holidays                                 | Add holiday                                 | `{ "name": "...", ...}`     |
| GET    | /api/vacations                                | List all vacations                          |                             |
| POST   | /api/vacations                                | Add vacation                                | `{ "employeeId": 1, ...}`   |
| GET    | /api/worklogs                                 | List all work logs                          |                             |
| POST   | /api/worklogs                                 | Add work log                                | `{ "employeeId": 1, ...}`   |
| GET    | /api/worklogs/employee/:employeeId            | List work logs for an employee              |                             |
| GET    | /api/vacations/employee/:employeeId           | List vacations for an employee              |                             |

---

## 12. Payroll Calculation Logic

### Salaried Employees
- **Monthly Pay:** The `salary` field is assumed to be the monthly salary. The monthly payroll calculation simply returns this value.
- **Yearly Pay:** Multiply the monthly salary by 12.

### Hourly Employees
- **Monthly Pay:**
  1. All work logs for the employee in the selected month are fetched.
  2. The total hours worked in that month are summed.
  3. Monthly pay = `hourlyRate * totalHoursWorkedInMonth`.
- **Yearly Pay:**
  1. All work logs for the employee in the selected year are fetched.
  2. The total hours worked in that year are summed.
  3. Yearly pay = `hourlyRate * totalHoursWorkedInYear`.

**Note:**
- The backend uses a robust date range calculation to ensure all days in the month are included (including months with 28, 29, 30, or 31 days).
- Only weekdays (Monday-Friday) are included in dummy data generation, so real data may vary.

---

## 13. Individual Employee Dashboard

### Overview
- Accessed via the Employees page by clicking the "Dashboard" button next to any employee.
- URL: `/employees/:id/dashboard`
- Shows a detailed summary for the selected employee, including:
  - Employee details (name, role, pay rate)
  - Summary cards (work days, total hours, vacation days, average hours/day)
  - Monthly pay calculator (select a month to see pay for that month)
  - Recent work logs (last 10 entries)
  - Recent vacations (last 5 entries)

### How to Use
1. Go to the **Employees** page.
2. Click the **Dashboard** button for any employee.
3. View the summary, recent activity, and use the monthly pay calculator.

### API
- `GET /api/employees/:id/summary` — Returns all summary data for the employee.
- `GET /api/employees/:id/summary?month=YYYY-MM` — Returns summary data and monthly pay for the selected month.

### Example Response
```json
{
  "employee": { "id": 1, "fullName": "Kamala Pingle", "role": "hourly", ... },
  "summary": {
    "totalWorkDays": 224,
    "totalHoursWorked": 1794,
    "totalVacationDays": 5,
    "monthlyPay": 72191.74,
    "averageHoursPerDay": 8.01
  },
  "recentWorkLogs": [ ... ],
  "recentVacations": [ ... ],
  "allWorkLogs": [ ... ],
  "allVacations": [ ... ]
}
```

---

## 14. Troubleshooting & FAQ

- **Payroll calculation seems off:**
  - Make sure the backend is using the correct date range logic (see code for details).
  - For hourly employees, only work logs within the selected month/year are included.
- **403 Forbidden on API:**  
  - AirPlay or another service may be using port 5000. Disable AirPlay Receiver or use a different port.
- **Database connection errors:**  
  - Double-check `.env` values and Supabase project ref/password.
- **Frontend "Failed to fetch" errors:**  
  - Ensure backend is running and accessible at the correct port.
- **Python import errors:**  
  - Always activate your virtual environment before running `main.py`.
- **Data not showing up:**  
  - Add employees first, then use their IDs for vacations and work logs.

---

## 15. Extending the System

- **Payroll Calculation:** Add logic to calculate salaries/wages based on work logs and employee type.
- **Payslip Generation:** Implement PDF/HTML payslip generation and download.
- **Tax & Deduction Handling:** Add modules for PF, ESI, TDS, etc.
- **Reporting:** Add dashboards and export features.
- **Authentication:** Add login and role-based access.
- **Employee Portal:** Allow employees to view/download payslips and check leave balances.

---

## 16. References

- [Supabase Docs](https://supabase.com/docs)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [psycopg2 Docs](https://www.psycopg.org/docs/)
- [Sequelize Docs](https://sequelize.org/)

---

**Copy this into your `README.md` for a professional, detailed project documentation!** 