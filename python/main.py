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

orgs = get_member_organizations(cur, 4)

if orgs != None:
  for org in orgs:
    print(org.get_name())

conn.close()