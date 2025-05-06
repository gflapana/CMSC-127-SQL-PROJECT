-- SYSTEM REPORTS

-- 1 View all members of the organization by role, status, gender, degree program, batch (year of membership), and committee. (Note: we assume one committee membership only per organization per semester)
-- by role
SELECT member.member_id AS "Member ID",CONCAT(first_name," ",middle_name," ",last_name) AS "Name",sex AS "Sex",degree_program AS "Degree Program",batch AS "University Batch", committee AS "Committee",member_status AS "Status",academic_year AS "Academic Year Joined" FROM organization_has_member JOIN member ON organization_has_member.member_id=member.member_id WHERE organization_id = 1 AND committee_role="Member";
-- by status
SELECT member.member_id AS "Member ID",CONCAT(first_name," ",middle_name," ",last_name) AS "Name",sex AS "Sex",degree_program AS "Degree Program",batch AS "University Batch", committee AS "Committee", committee_role AS "Committee Role",academic_year AS "Academic Year Joined"  FROM organization_has_member JOIN member ON organization_has_member.member_id=member.member_id WHERE organization_id = 1 AND member_status="Active";
-- by gender
SELECT member.member_id AS "Member ID",CONCAT(first_name," ",middle_name," ",last_name) AS "Name",degree_program AS "Degree Program",batch AS "University Batch", committee AS "Committee", committee_role AS "Committee Role",member_status AS "Status",academic_year AS "Academic Year Joined"  FROM organization_has_member JOIN member ON organization_has_member.member_id=member.member_id WHERE organization_id = 1 AND sex="Male";
-- by degree program
SELECT member.member_id AS "Member ID",CONCAT(first_name," ",middle_name," ",last_name) AS "Name",sex AS "Sex",batch AS "University Batch", committee AS "Committee", committee_role AS "Committee Role",member_status AS "Status",academic_year AS "Academic Year Joined"  FROM organization_has_member JOIN member ON organization_has_member.member_id=member.member_id WHERE organization_id = 1 AND degree_program="Bachelor of Science in Computer Science";
-- by year of membership
SELECT member.member_id AS "Member ID",CONCAT(first_name," ",middle_name," ",last_name) AS "Name",sex AS "Sex",degree_program AS "Degree Program",batch AS "University Batch", committee AS "Committee", committee_role AS "Committee Role",member_status AS "Status" FROM organization_has_member JOIN member ON organization_has_member.member_id=member.member_id WHERE organization_id = 1 AND academic_year="2024-2025";
-- by committee
SELECT member.member_id AS "Member ID",CONCAT(first_name," ",middle_name," ",last_name) AS "Name",sex AS "Sex",degree_program AS "Degree Program",batch AS "University Batch", committee_role AS "Committee Role",member_status AS "Status",academic_year AS "Academic Year Joined"  FROM organization_has_member JOIN member ON organization_has_member.member_id=member.member_id WHERE organization_id = 1 AND committee="Visuals and Logistics";


-- 2 View members for a given organization with unpaid membership fees or dues for a given semester and academic year.

SELECT member.member_id AS "Member ID",CONCAT(first_name," ",middle_name," ",last_name) AS "Name",fee_id AS "Fee Code", fee_amount AS "Amount", due_date AS "Due Date", semester AS "Semester Issued",academic_year AS "Academic Year Issued" FROM member JOIN fee ON member.member_id=fee.member_id WHERE payment_status="Unpaid" AND organization_id=1 AND semester="2nd Semester" AND academic_year="2024-2025";

-- 3 View a member’s unpaid membership fees or dues for all their organizations (Member’s POV).

SELECT fee_id AS "Fee Code", fee_amount AS "Amount", due_date "Due Date", semester AS "Semester Issued", academic_year AS "Academic Year Issued" , organization_name AS "Organization" FROM organization JOIN fee ON organization.organization_id=fee.organization_id WHERE payment_status="Unpaid" AND member_id=1;

-- 4 View all executive committee members of a given organization for a given academic year. 

SELECT member.member_id AS "Member ID",CONCAT(first_name," ",middle_name," ",last_name) AS "Name",committee_role AS "Executive Role",member_status AS "Status",sex AS "Sex",degree_program AS "Degree Program",batch AS "University Batch", academic_year AS "Academic Year Joined" FROM organization_has_member JOIN member ON organization_has_member.member_id=member.member_id WHERE committee="Executive" AND academic_year="2024-2025";

-- 5 View all Presidents (or any other role) of a given organization for every academic year in reverse chronological order (current to past).

SELECT member.member_id AS "Member ID",CONCAT(first_name," ",middle_name," ",last_name) AS "Name", sex AS "Sex",degree_program AS "Degree Program",batch AS "University Batch", committee AS "Committee", academic_year AS "Academic Year Joined", semester AS "Semester Joined" FROM organization_has_member JOIN member ON organization_has_member.member_id=member.member_id WHERE committee_role="Member" AND organization_id=1 ORDER BY CONCAT(academic_year,semester) desc;
