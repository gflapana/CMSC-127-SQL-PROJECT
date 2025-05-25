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
    print("Successfully connected to the Database!")
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

# Get Cursor
cur = conn.cursor()

# Frontend probably goes here?
currentMember = sign_up(cur, "John", "Bautista", "emy12345", "emy1234", "Male", "Bachelor of Science in Computer Science", 2023)

if currentMember != None:
  print(currentMember.get_batch())

conn.close()