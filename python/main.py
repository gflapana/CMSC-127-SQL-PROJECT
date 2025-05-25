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
# currentMember = member_sign_in(cur,"geof123","geof234")
currentOrg = organization_sign_in(cur, "yses2005","ysesexperience")

# if currentMember != None:
#   print(f"{currentMember.get_first_name()} {currentMember.get_middle_name()} {currentMember.get_last_name()}")

if currentOrg != None:
    print(f"{currentOrg.get_events()[0]}")

conn.close()