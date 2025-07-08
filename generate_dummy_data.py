import os
import random
from datetime import datetime, timedelta
import psycopg2
from dotenv import load_dotenv
from faker import Faker
import time # Import the time module for delays

# Load environment variables from .env
load_dotenv()
fake = Faker("en_IN") # Use Indian locale for more realistic names

# Database connection details from .env
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

# Comprehensive list of West Bengal Public Holidays for 2025
# Excluded holidays that fall on Sundays as per "Note 2" in the provided list.
# Combined names for holidays falling on the same date.
wb_holidays_2025 = [
    ("2025-01-01", "New Year's Day"),
    ("2025-01-23", "Netaji's Birthday"),
    ("2025-02-03", "Day after Saraswati Puja"), # Feb 2 is Sunday
    ("2025-02-14", "Birthday of Thakur Panchanan Barma / Shab-e-Barat"),
    ("2025-02-26", "Shivaratri"),
    ("2025-03-14", "Doljatra / Holi"), # Doljatra and Holi fall on same day
    ("2025-03-15", "Day after Doljatra"),
    ("2025-03-27", "Birthday of Shri Shri Harichand Thakur"),
    ("2025-03-31", "Eid-Ul-Fitr"),
    ("2025-04-01", "Day after Eid-Ul-Fitr"),
    ("2025-04-10", "Mahavir Jayanti"),
    ("2025-04-14", "Birthday of Dr. B. R. Ambedkar"),
    ("2025-04-15", "Bengali New Year's Day (Nababarsha)"),
    ("2025-04-18", "Good Friday"),
    ("2025-05-01", "May Day"),
    ("2025-05-09", "Birthday of Rabindranath Tagore"),
    ("2025-05-12", "Buddha Purnima"),
    ("2025-06-06", "Day before Id-Ud-Zoha (Bakrid)"),
    ("2025-06-07", "Id-Ud-Zoha (Bakrid)"),
    ("2025-06-27", "Rathayatra"),
    ("2025-08-09", "Rakhi Bandhan"),
    ("2025-08-15", "Independence Day / Janmastami"), # Both on same day
    ("2025-09-05", "Fateha-Dwaz-Daham"),
    ("2025-09-26", "Durga Puja, Maha Chaturthi"),
    ("2025-09-27", "Durga Puja, Maha Panchami"),
    ("2025-09-29", "Durga Puja, Maha Saptami"),
    ("2025-09-30", "Durga Puja, Maha Astami"),
    ("2025-10-01", "Durga Puja, Maha Nabami"),
    ("2025-10-02", "Durga Puja, Dasami / Birthday of Gandhiji"), # Both on same day
    ("2025-10-03", "Additional Day for Durga Puja"),
    ("2025-10-04", "Additional Day for Durga Puja"),
    ("2025-10-06", "Lakshmi Puja"),
    ("2025-10-07", "Additional Day for Lakshmi Puja"),
    ("2025-10-20", "Kali Puja"),
    ("2025-10-21", "Additional Day for Kali Puja"),
    ("2025-10-22", "Additional Day for Kali Puja"),
    ("2025-10-23", "Bhratridwitiya"),
    ("2025-10-24", "Day after Bhratridwitiya"),
    ("2025-10-27", "Chhat Puja"),
    ("2025-10-28", "Additional Day for Chhat Puja"),
    ("2025-11-05", "Birthday of Guru Nanak"),
    ("2025-11-15", "Birthday of Birsa Munda"),
    ("2025-12-25", "Christmas Day"),
]

def connect_db():
    return psycopg2.connect(
        user=USER, password=PASSWORD, host=HOST, port=PORT, dbname=DBNAME
    )

def insert_employees(cursor, num_employees=15): # Increased to 15 employees
    print("  Truncating 'employees' table...")
    cursor.execute("TRUNCATE TABLE employees RESTART IDENTITY CASCADE;")
    employee_ids = []
    
    # Restored more descriptive roles for accurate salary assignment
    roles_list = ['Software Engineer', 'Project Manager', 'HR Specialist', 'Accountant', 
                  'Data Analyst', 'Marketing Manager', 'DevOps Engineer', 'Sales Executive']

    employee_data_to_insert = []
    for _ in range(num_employees):
        name = fake.name()
        role = random.choice(['salaried', 'hourly'])
        
        # Realistic Indian salaries (e.g., annual, in INR)
        if 'Engineer' in role or 'Analyst' in role or 'DevOps' in role:
            salary = round(random.uniform(700000, 1800000), 2)
        elif 'Manager' in role or 'Lead' in role:
            salary = round(random.uniform(900000, 2500000), 2)
        else: # HR, Accountant, Sales, Support etc.
            salary = round(random.uniform(450000, 1000000), 2)
            
        # Assuming 22 working days/month * 8 hours/day = 176 hours/month.
        # Annual salary / (12 months * 176 hours/month)
        hourly_rate = round(salary / (12 * 22 * 8), 2) 

        employee_data_to_insert.append((name, role, salary, hourly_rate, datetime.now(), datetime.now()))

    # Using executemany for batch insertion of employees
    insert_query = """
        INSERT INTO employees ("fullName", role, salary, "hourlyRate", "createdAt", "updatedAt")
        VALUES (%s, %s, %s, %s, %s, %s) RETURNING id
    """
    print(f"  Inserting {num_employees} employees in batch...")
    cursor.executemany(insert_query, employee_data_to_insert)
    
    cursor.execute("SELECT id FROM employees ORDER BY id ASC;") # Assuming IDs are sequential or ordered
    employee_ids = [row[0] for row in cursor.fetchall()]
    return employee_ids


def insert_holidays(cursor):
    print("  Truncating 'holidays' table...")
    cursor.execute("TRUNCATE TABLE holidays RESTART IDENTITY CASCADE;")
    
    holidays_data_to_insert = []
    for holiday_date, holiday_name in wb_holidays_2025:
        holidays_data_to_insert.append((holiday_name, holiday_date, datetime.now(), datetime.now())) # Corrected order for insert values

    insert_query = """
        INSERT INTO holidays (name, date, "createdAt", "updatedAt")
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (date) DO NOTHING 
    """
    print(f"  Inserting {len(holidays_data_to_insert)} holidays in batch...")
    cursor.executemany(insert_query, holidays_data_to_insert)

def insert_worklogs(cursor, employee_ids):
    print("  Truncating 'work_logs' table...")
    cursor.execute("TRUNCATE TABLE work_logs RESTART IDENTITY CASCADE;")
    
    holidays_dates_set = set()
    for h_date_str, _ in wb_holidays_2025:
        h_date = datetime.strptime(h_date_str, "%Y-%m-%d").date()
        if h_date.weekday() < 5: 
            holidays_dates_set.add(h_date)

    start_date = datetime(2025, 1, 1)
    end_date = datetime(2025, 12, 31)

    work_log_data_to_insert = []
    
    print("  Generating work log data...")
    for emp_id in employee_ids:
        curr_date = start_date
        while curr_date <= end_date:
            if curr_date.weekday() < 5 and curr_date.date() not in holidays_dates_set:
                hours = round(random.uniform(7.0, 9.0), 1)
                work_log_data_to_insert.append((emp_id, curr_date.date(), hours, datetime.now(), datetime.now()))
            curr_date += timedelta(days=1)
    
    print(f"  Total {len(work_log_data_to_insert)} work log entries generated.")

    insert_query = """
        INSERT INTO work_logs ("employeeId", date, "hoursWorked", "createdAt", "updatedAt")
        VALUES (%s, %s, %s, %s, %s)
    """
    batch_size = 100 # Retained reduced batch size for stability
    for i in range(0, len(work_log_data_to_insert), batch_size):
        batch = work_log_data_to_insert[i:i + batch_size]
        print(f"  Inserting work logs batch {i // batch_size + 1} of {(len(work_log_data_to_insert) + batch_size -1) // batch_size} (rows {i} to {i + len(batch) -1})...")
        cursor.executemany(insert_query, batch)
        time.sleep(0.1) # Retained small delay after each batch

def insert_vacations(cursor, employee_ids):
    print("  Truncating 'vacations' table...")
    cursor.execute("TRUNCATE TABLE vacations RESTART IDENTITY CASCADE;")
    
    vacation_data_to_insert = []
    
    print("  Generating vacation data...")
    for emp_id in employee_ids:
        num_vacations = random.randint(1, 3)
        for _ in range(num_vacations):
            start_month = random.randint(1, 12)
            start_day = random.randint(1, 28)
            start_date_vac = datetime(2025, start_month, start_day)
            
            duration_days = random.randint(3, 10)
            end_date_vac = start_date_vac + timedelta(days=duration_days)

            if end_date_vac.year > 2025:
                end_date_vac = datetime(2025, 12, 31)

            vacation_data_to_insert.append((emp_id, start_date_vac.date(), end_date_vac.date()))
            
    print(f"  Total {len(vacation_data_to_insert)} vacation entries generated.")

    insert_query = """
        INSERT INTO vacations ("employeeId", "startDate", "endDate", "createdAt", "updatedAt")
        VALUES (%s, %s, %s, NOW(), NOW())
    """
    batch_size = 100 # Retained reduced batch size
    for i in range(0, len(vacation_data_to_insert), batch_size):
        batch = vacation_data_to_insert[i:i + batch_size]
        print(f"  Inserting vacations batch {i // batch_size + 1} of {(len(vacation_data_to_insert) + batch_size -1) // batch_size} (rows {i} to {i + len(batch) -1})...")
        cursor.executemany(insert_query, batch)
        time.sleep(0.1) # Retained small delay

# Main execution block
conn = None 
cur = None  
try:
    print("Attempting to connect to the database...")
    conn = connect_db()
    cur = conn.cursor()
    print("✅ Database connection established.")

    print("\n--- Starting Data Insertion ---")

    print("\nInserting employees...")
    employee_ids = insert_employees(cur)
    print(f"✅ Inserted {len(employee_ids)} employees.")

    print("\nInserting holidays...")
    insert_holidays(cur)
    print(f"✅ Inserted {len(wb_holidays_2025)} holidays.")

    print("\nInserting work logs...")
    insert_worklogs(cur, employee_ids)
    print("✅ Work logs inserted.")

    print("\nInserting vacations...")
    insert_vacations(cur, employee_ids)
    print("✅ Vacations inserted.")

    print("\nCommitting changes to the database...")
    conn.commit()
    print("✅ Changes committed successfully!")

    print("\n🎉 All dummy data insertion process completed.")

except psycopg2.Error as e:
    print(f"\n❌ Database Error: {e}")
    if conn:
        conn.rollback() 
        print("❗ Transaction rolled back due to database error.")
except Exception as e:
    print(f"\n❌ An unexpected error occurred: {e}")
    if conn:
        conn.rollback() 
        print("❗ Transaction rolled back due to unexpected error.")
finally:
    if cur:
        cur.close()
        print("Cursor closed.")
    if conn:
        conn.close()
        print("Database connection closed.")