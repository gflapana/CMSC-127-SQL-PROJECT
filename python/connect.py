# Module Imports
import mariadb
import sys

# Connect to MariaDB Platform
try:
    conn = mariadb.connect(
        user="root",
        password="password",
        host="127.0.0.1",
        port=3306,
        database="studorg"
    )
    print("Successfully connected to the Database!")
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

# Get Cursor
cur = conn.cursor()
cur.execute("""SELECT m.member_id, CONCAT(m.first_name, ' ', m.last_name) AS full_name, f.fee_amount
FROM member AS m
JOIN organization_has_member AS ohm
ON m.member_id = ohm.member_id
JOIN fee AS f
ON ohm.member_id = f.member_id
WHERE f.date_paid IS NULL 
  AND ohm.organization_id = 1 
  AND f.fee_amount = (SELECT MAX(fee_amount) FROM fee WHERE date_paid IS NULL)
  AND f.semester = "2nd Semester";""")
row = cur.fetchall()
print(row)

cur.execute("""SELECT 
    SUM(CASE WHEN f.date_paid IS NULL THEN f.fee_amount ELSE 0 END) AS total_unpaid_fees,
    SUM(CASE WHEN f.date_paid IS NOT NULL THEN f.fee_amount ELSE 0 END) AS total_paid_fees,
    CURDATE() AS as_of_date
FROM fee AS f
JOIN organization AS o
ON f.organization_id = o.organization_id
WHERE o.organization_id = 1  -- change this to the desired organization
  AND f.due_date <= CURDATE()""")

row = cur.fetchall()
print(row)

conn.close()