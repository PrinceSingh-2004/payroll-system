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

---

## Certification / Approval Page

> **Certification**
>
> This is to certify that the Payroll System project is an original work completed by the undersigned. All code, documentation, and design are the result of the author's own effort, except where explicitly referenced. This project has not been submitted elsewhere for any academic or professional purpose.
>
> **Name:** [Your Name Here]
>
> **Date:** [Date Here]

---

## Acknowledgement

I would like to express my sincere gratitude to all those who supported and guided me throughout the development of this project. Special thanks to my mentors, peers, and the open-source community for their invaluable resources and encouragement.

---

## Abstract

The Payroll System is a full-stack web application designed to streamline employee management, attendance, and payroll processing for organizations. It features robust authentication, role-based access, and modular design. Built with React, Node.js/Express, and Supabase, the system enables efficient handling of employees, holidays, vacations, work logs, and payroll calculations. The project demonstrates modern web development practices and scalable architecture.

---

## Project Specifications

### Project Title
Payroll System

### Project Type
Web Application

### Technologies Used
- **Languages:** JavaScript (Node.js, React), Python (utility scripts)
- **Frameworks/Libraries:** React, Material-UI, Express, Sequelize, Supabase-js, Axios
- **Database:** Supabase (PostgreSQL)

### Tools Used
- **IDEs:** VS Code
- **Testing/Servers:** npm, Postman, virtualenv, Python
- **Design Tools:** [Add if any, e.g., Figma, draw.io]

### Backend/Database Support
- Supabase (PostgreSQL) for persistent storage
- Sequelize ORM for backend data access
- Python scripts for direct DB access/analytics

### Target Users/Audience
- HR Managers
- Payroll Administrators
- Employees (self-service dashboard)
- Small to medium organizations

### Main Modules/Components
- Employee Management
- Holiday Management
- Vacation Management
- Work Log Management
- Payroll Calculation
- Authentication & Role Management
- Admin Dashboard

---

## Platform and Browser Support
- **Platforms:** Windows, macOS, Linux
- **Browsers:** Chrome, Firefox, Edge, Safari (latest versions)
- **Mobile:** Responsive design for tablets and phones

---

## Objectives and Scope

### Project Objectives
- Provide a secure, user-friendly payroll management system
- Automate payroll calculations and record-keeping
- Enable role-based access for admins, HR, and employees
- Support extensibility for future payroll features

### Scope of the Project
- **In-Scope Features:**
  - Employee, holiday, vacation, and work log CRUD
  - Payroll calculation logic
  - Role-based authentication
  - Responsive web UI
- **Out-of-Scope (Future Enhancements):**
  - Payslip generation
  - Automated bank transfers
  - Advanced analytics and reporting
  - Mobile app

---

## Project Management Plan

### Tools Used
- Git & GitHub (version control)
- VS Code (development)
- Postman (API testing)
- Supabase dashboard (DB management)

### Methodology Followed
- Modular development
- Agile-inspired iterative cycles

### Timeline/Phases
- Requirement Analysis
- UI/UX Design
- Backend & API Development
- Frontend Development
- Integration & Testing
- Documentation

---

## Folder Structure

```
payroll-system/
  payroll-backend/
    config/
    controllers/
    models/
    routes/
    server.js
    package.json
  payroll-frontend/
    public/
    src/
      components/
      contexts/
      pages/
      services/
      App.js
      index.js
    package.json
  main.py
  README.md
```

---

## Module Overview

### Employee Management
- **Location:** backend/controllers/employeeController.js, frontend/src/components/Employee*
- **Purpose:** CRUD for employee records
- **Key Features:** Add, edit, delete, list employees; view details

### Holiday Management
- **Location:** backend/controllers/holidayController.js, frontend/src/components/Holiday*
- **Purpose:** Manage public holidays

### Vacation Management
- **Location:** backend/controllers/vacationController.js, frontend/src/components/Vacation*
- **Purpose:** Track employee vacations

### Work Log Management
- **Location:** backend/controllers/workLogController.js, frontend/src/components/WorkLog*
- **Purpose:** Record daily work hours

### Payroll Calculation
- **Location:** backend/controllers/employeeController.js (calculatePayroll)
- **Purpose:** Compute monthly pay, handle deductions

### Authentication & Role Management
- **Location:** frontend/src/contexts/AuthContext.js, Supabase user_roles table
- **Purpose:** Secure login, role-based access

---

## System Architecture

### Layers/Components
- **Presentation Layer:** React frontend (UI, routing, state management)
- **Logic Layer:** Node.js/Express backend (API, business logic)
- **Data Layer:** Supabase (PostgreSQL)

### Architectural Diagram
> _[Insert system architecture diagram here, e.g., Mermaid or draw.io diagram]_ 

---

## Requirement Specification & Analysis

### Functional Requirements
- User Authentication (Supabase)
- Employee, Holiday, Vacation, Work Log CRUD
- Payroll Calculation
- Role-based access (admin, HR, employee)

### Non-Functional Requirements
- Usability: Responsive, intuitive UI
- Reliability: Error handling, validation
- Performance: Fast API, optimized queries
- Security: Auth, role checks, CORS
- Portability: Cross-platform/browser

---

## Data Flow Diagram (DFD)

- **Level 0 DFD (Context Diagram):**
> _[Insert Level 0 DFD diagram here]_ 

- **Level 1 DFD (Internal Flow):**
> _[Insert Level 1 DFD diagram here]_ 

---

## Entity Relationship Diagram (ERD)
> _[Insert ERD diagram here]_ 

---

## Flow of the System (UI Navigation & Functional Flow)
- Login → Dashboard → (Employees | Holidays | Vacations | Work Logs | Payroll)
- Admin/HR can manage all records; Employees see their own data
- Logout returns to login page

---

## Database Table Design (Schema)

### employees
| Field      | Type    | Description           |
|------------|---------|----------------------|
| id         | int     | Primary Key          |
| fullName   | varchar | Employee name        |
| role       | enum    | salaried/hourly      |
| salary     | float   | Monthly salary       |
| hourlyRate | float   | Hourly wage          |
| ...        | ...     | ...                  |

### holidays
| Field    | Type    | Description         |
|----------|---------|--------------------|
| id       | int     | Primary Key        |
| name     | varchar | Holiday name       |
| date     | date    | Date of holiday    |

### vacations
| Field      | Type    | Description           |
|------------|---------|----------------------|
| id         | int     | Primary Key          |
| employeeId | int     | FK to employees      |
| startDate  | date    | Vacation start       |
| endDate    | date    | Vacation end         |

### work_logs
| Field      | Type    | Description           |
|------------|---------|----------------------|
| id         | int     | Primary Key          |
| employeeId | int     | FK to employees      |
| date       | date    | Work date            |
| hoursWorked| float   | Hours worked         |

### user_roles
| Field    | Type    | Description         |
|----------|---------|--------------------|
| id       | int     | Primary Key        |
| user_id  | uuid    | FK to auth.users   |
| role     | text    | admin/hr/employee  |

---

## User Interface Screenshots
> _[Insert screenshots of key UI screens here]_ 

---

## Functional Modules Description
- **Employee Management:** CRUD, validation, search
- **Holiday Management:** CRUD, date validation
- **Vacation Management:** CRUD, overlap checks
- **Work Log Management:** CRUD, daily/hourly entry
- **Payroll Calculation:** Salary, hourly, vacation deduction logic
- **Authentication:** Supabase session, role fetch, protected routes

---

## Challenges Faced During Development
- Supabase CORS and session timeout issues
- Role fetch and RLS policy debugging
- React state management for auth and loading
- Ensuring robust logout/session handling
- Integrating Python scripts with Supabase

---

## Significance of the Project
- **Educational Importance:** Demonstrates full-stack web development, database design, and authentication
- **Skill Development:** React, Node.js, Supabase, REST APIs, Python scripting
- **Real-World Relevance:** Payroll/HR systems are critical for organizations
- **Scalable Design:** Modular, extensible, and cloud-ready

---

## Future Enhancements
- Payslip PDF generation
- Automated salary disbursement
- Advanced analytics and reporting
- Mobile app version
- Multi-language support

---

## Conclusion
The Payroll System project successfully demonstrates a modern, modular approach to employee and payroll management. It integrates secure authentication, robust backend logic, and a responsive frontend. The project lays a strong foundation for further enhancements and real-world deployment.

---

## References / Bibliography
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/)
- [Material-UI](https://mui.com/)
- [Sequelize ORM](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## Appendix – Source Code Snippets

### 1. Supabase Authentication (Frontend)
```js
// src/contexts/AuthContext.js
// Sign in with email and password using Supabase
const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
```

### 2. Role-Based Route Protection (React)
```jsx
// src/components/PrivateRoute.js
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user || (requiredRole && role !== requiredRole)) {
    return <Navigate to="/login" />;
  }
  return children;
};
```

### 3. Payroll Calculation Logic (Backend)
```js
// payroll-backend/controllers/employeeController.js
// Calculate payroll for a given month
exports.calculatePayroll = async (req, res) => {
  const { month } = req.query; // e.g., '2024-07'
  const employees = await Employee.findAll();
  const payroll = [];

  for (const emp of employees) {
    let pay = 0;
    if (emp.role === 'salaried') {
      pay = emp.salary;
    } else if (emp.role === 'hourly') {
      const logs = await WorkLog.findAll({
        where: { employeeId: emp.id, date: { [Op.like]: `${month}%` } }
      });
      const totalHours = logs.reduce((sum, log) => sum + log.hoursWorked, 0);
      pay = emp.hourlyRate * totalHours;
    }
    payroll.push({ employee: emp.fullName, pay });
  }
  res.json(payroll);
};
```

### 4. Vacation Overlap Check (Backend)
```js
// payroll-backend/controllers/vacationController.js
// Prevent overlapping vacations for the same employee
const isOverlapping = (start1, end1, start2, end2) => {
  return (start1 <= end2) && (end1 >= start2);
};

// Usage in vacation creation logic
const existingVacations = await Vacation.findAll({ where: { employeeId } });
for (const vac of existingVacations) {
  if (isOverlapping(newStart, newEnd, vac.startDate, vac.endDate)) {
    return res.status(400).json({ error: 'Vacation dates overlap with an existing vacation.' });
  }
}
```

### 5. Supabase Table Query (Frontend)
```js
// src/services/employeeService.js
// Fetch all employees from Supabase
export async function fetchEmployees() {
  const { data, error } = await supabase.from('employees').select('*');
  if (error) throw error;
  return data;
}
```

### 6. Logout and Session Clear (Frontend)
```js
// src/contexts/AuthContext.js
const logout = async () => {
  await supabase.auth.signOut();
  setUser(null);
  setRole(null);
  setUserProfile(null);
  setLoading(false);
};
```

### 7. Sequelize Model Example (Backend)
```js
// payroll-backend/models/employee.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  fullName: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('salaried', 'hourly'), allowNull: false },
  salary: { type: DataTypes.FLOAT },
  hourlyRate: { type: DataTypes.FLOAT }
});

module.exports = Employee;
```

### 8. Python DB Utility: Fetch All Employees
```python
# main.py
import psycopg2
import os

conn = psycopg2.connect(
    dbname='postgres',
    user=os.getenv('user'),
    password=os.getenv('password'),
    host=os.getenv('host'),
    port=os.getenv('port')
)
cur = conn.cursor()
cur.execute('SELECT * FROM employees;')
for row in cur.fetchall():
    print(row)
cur.close()
conn.close()
```

--- 