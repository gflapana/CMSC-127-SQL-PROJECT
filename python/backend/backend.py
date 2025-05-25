import mariadb
from models.member import Member
from models.organization import Organization

def sign_up(cur: mariadb.Cursor , first_name: str, last_name: str,  username: str, password: str, sex: str, degree_program: str, batch: int, middle_name: str | None = None) -> Member | None:
    try:
        # run the sql command
        cur.execute(
            "SELECT * from member where member_username = ?",
            [username]
            )
        # get the results of the query
        row = cur.fetchall()

        #Check if username is taken
        if len(row) != 0:
            print("Username is taken!")
            return
        
        #Run the insert command, 
        cur.execute(
            "INSERT INTO member (first_name, middle_name, last_name, sex, degree_program, batch, member_username, member_password) values (?, ?, ?, ?, ?, ?, ?, SHA2(?,0))",
            [first_name, middle_name, last_name, sex, degree_program, batch, username, password]
        )

        cur.execute(
            "SELECT member_id from member WHERE member_username = ?",
            [username]
        )

        row = cur.fetchone()

        return Member(
            row[0],
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

def member_sign_in(cur: mariadb.Cursor, username: str, password: str) -> Member | None:
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
            row[0],
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

def organization_sign_in(cur: mariadb.Cursor, username: str, password: str ) -> Organization | None:
    try:
        cur.execute(
            "SELECT * from organization where organization_username = ? AND organization_password = SHA2(?,0)",
            [username,password]
            )
        
        row = cur.fetchone()

        if row == None:
            print("Wrong details!")
            return
        
        cur.execute(
            "SELECT event_name from organization_event where organization_id = ?",
            [row[0]]
        )

        events_row = cur.fetchall()
        events = []
        for org_event in events_row:
            events.append(org_event[0])

        return Organization(
            row[0],
            row[1],
            row[2],
            row[3],
            row[4],
            events,
            row[5]
        )

    except mariadb.Error as e:
        print(f"Error: {e}")

def get_member_organizations(cur: mariadb.Cursor, id: str, type: str | None = None, date_established: int | None = None, years_active: int | None = None, ) -> list[Organization] | None :
    query = "SELECT distinct organization_id, organization_name, organization_type, date_established, years_active from organization natural join organization_has_member WHERE member_id = ?"
    conditions = []
    params = [id]
    organizations = []
    if type:
        conditions.append("organization_type = ?")
        params.append(type)
    if date_established:
        conditions.append("date_established = ?")
        params.append(date_established)
    if years_active:
        conditions.append("years_active = ?")
        params.append(years_active)
    
    if conditions:
        query += " AND ".join(conditions)
    
    try:
        cur.execute(query,params)
        
        rows = cur.fetchall()
        for row in rows:
            cur.execute("SELECT event_name from organization_event where organization_id = ?", [row[0]])
            events_row = cur.fetchall()
            events = []
            for org_event in events_row:
                events.append(org_event[0])
            organizations.append(
                Organization(
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    events,
                )
            )
        return organizations

    except mariadb.Error as e:
        print(f"Error: {e}")