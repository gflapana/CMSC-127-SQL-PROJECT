# Module Imports
import mariadb
from models.member import Member
from backend.backend import *
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
    conn.autocommit = True
    print("Successfully connected to the Database!\n")
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

# Get Cursor
cur = conn.cursor()

member =member_sign_in(cur, "emy123","emy1234")

print(member.get_id())

conn.close()