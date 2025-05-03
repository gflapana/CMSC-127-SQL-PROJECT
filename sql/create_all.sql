--switch to database
use studorg;

-- Insert into Organization Table
INSERT INTO organization(organization_name, organization_type, date_established, years_active, organization_username, organization_password)
VALUES
("Young Software Engineers' Society", "Academic", 2005, YEAR(CURDATE()) - 2005, "yses2005", "ysesexperience"),
("UPLB Lisieux Music Ministry", "Religious", 1981, YEAR(CURDATE()) - 1981, "lmm1981", "lisyu"),
("UP Oroquieta", "Varsitarian", 1996, YEAR(CURDATE()) - 1996, "upo1996", "upoquezon"),
("Gaming Society of Gamers", "Varsitarian", 2000, YEAR(CURDATE()) - 2000, "gsg2000", "gamingsoc"),
("Studying Alliance of Students", "Academic", 2000, YEAR(CURDATE()) - 2000, "sas200", "studyingall");


-- Insert into Member Table
INSERT INTO member(first_name, middle_name, last_name, sex, degree_program, batch, member_username, member_password)
VALUES
("John", "Emy", "Bautista", "Male", "Bachelor of Science in Computer Science", 2023, "emy123", "emy1234"),
("Geoffrey", "Gabriel", "Lapaña", "Male", "Bachelor of Science in Computer Science", 2023, "geof123", "geof1234"),
("Lawrence", "Joel", "Macatangay", "Female", "Bachelor of Science in Computer Science", 2023, "joel123", "joel1234"),
("Amy", NULL, "Santiago", "Female", "Bachelor of Science in Chemical Engineering", 2022, "amy123", "amy1234"),
("Jake", NULL, "Peralta", "Male", "Bachelor of Science in Development Communication", 2022, "jake123", "jake1234");

-- Insert into Fee Table
INSERT INTO fee(fee_amount, due_date, date_paid, payment_status, semester, academic_year, organization_id, member_id)
VALUES
(1000, '2025-04-14', NULL, "Unpaid", "2nd Semester", "2024-2025", 1, 1),
(1000, '2025-04-14', '2025-04-01', "Paid", "2nd Semester", "2024-2025", 2, 2),
(1000, '2025-04-14', '2025-04-01', "Paid", "2nd Semester", "2024-2025", 3, 3),
(500, '2025-05-14', '2025-05-15', "Paid Late", "2nd Semester", "2024-2025", 4, 5),
(500, '2025-05-14', '2025-05-01', "Paid", "2nd Semester", "2024-2025", 5, 4);

-- Insert Org events in table
INSERT INTO organization_event(organization_id, event_name)
VALUES
(1, "P20JECT YSES"),
(2, "Voice Training"),
(3, "Intellectuals' Quiz"),
(4, "Dota2 1v1 Tournament"),
(5, "Internals Quiz Bee");

-- Insert into Organization Member Table
INSERT INTO organization_has_member(organization_id, member_id, committee, committee_role, member_status, academic_year, semester)
VALUES
(1, 1, "Visuals and Logistics", "Member", "Active", "2024-2025", "2nd Semester"),
(2, 2, "Service", "Service Head", "Active", "2024-2025", "2nd Semester"),
(1, 3, "Projects and Activities", "Member", "Active", "2024-2025", "2nd Semester"),
(3, 3, "Education", "Member", "Active", "2024-2025", "2nd Semester"),
(4, 5, NULL, NULL, "Inactive", "2024-2025", "2nd Semester"),
(5, 4, "Logistics", "Logistics Head", "Active", "2024-2025", "2nd Semester");