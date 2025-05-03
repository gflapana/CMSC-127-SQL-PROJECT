--switch to database
use studorg;

-- Insert into Member Table
INSERT INTO member(first_name, middle_name, last_name, sex, degree_program, batch, member_username, member_password)
VALUES
("John", "Emy", "Bautista", "Male", "Bachelor of Science in Computer Science", 2023, "emy123", "emy1234"),
("Geoffrey", "Gabriel", "Lapaña", "Male", "Bachelor of Science in Computer Science", 2023, "geof123", "geof1234"),
("Lawrence", "Joel", "Macatangay", "Female", "Bachelor of Science in Computer Science", 2023, "joel123", "joel1234"),
("Amy", NULL, "Santiago", "Female", "Bachelor of Science in Chemical Engineering", 2022, "amy123", "amy1234"),
("Jake", NULL, "Peralta", "Male", "Bachelor of Science in Development Communication", 2022, "jake123", "jake1234");