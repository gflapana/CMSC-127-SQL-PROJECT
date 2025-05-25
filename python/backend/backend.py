import mariadb
from models.member import Member

def sign_up(cur: mariadb.Cursor , first_name: str, last_name: str,  username: str, password: str, sex: str, degree_program: str, batch: int, middle_name: str | None = None):
    try:
        # print("function is starting!")
        cur.execute(
            "SELECT * from member where member_username = ?",
            [username]
            )
        # print("I made it here!")
        row = cur.fetchall()

        if len(row) != 0:
            print("Username is taken!")
            return
        
        cur.execute(
            "INSERT INTO member (first_name, middle_name, last_name, sex, degree_program, batch, member_username, member_password) values (?, ?, ?, ?, ?, ?, ?, SHA2(?,0))",
            [first_name, middle_name, last_name, sex, degree_program, batch, username, password]
        )

        return Member(
            first_name,
            last_name,
            sex,
            degree_program,
            batch,
            username,
            middle_name
        )
        
    except mariadb.Error as e:
        print(f"Error: {e}")

def member_sign_in(cur: mariadb.Cursor, username: str, password: str):
    try:
        cur.execute(
            "SELECT * from member where member_username = ? AND member_password = SHA2(?,0)",
            [username,password]
            )
        row = cur.fetchone()

        if row == None:
            print("Wrong details!")
            return

        return Member(
            row[1],
            row[3],
            row[4],
            row[5],
            row[6],
            row[7],
            row[2]
        )

    except mariadb.Error as e:
        print(f"Error: {e}")