--switch to database
use studorg;

-- 6 View all late payments made by all members of a given organization for a given semester and academic year. (change the where clause to get the desired organization, semester, and academic year)
SELECT ohm.member_id, CONCAT(m.first_name, ' ', m.last_name) AS full_name, f.fee_amount, f.due_date, f.date_paid, f.payment_status, f.semester, f.academic_year
FROM organization AS o
JOIN organization_has_member AS ohm ON o.organization_id = ohm.organization_id
JOIN member AS m ON ohm.member_id = m.member_id
JOIN fee AS f ON ohm.member_id = f.member_id
WHERE (f.due_date < f.date_paid 
    AND ohm.organization_id = 4 -- change this to the desired organization
    AND f.semester = "2nd Semester" -- change this to the desired semester
    AND f.academic_year = "2024-2025"); -- change this to the desired academic year

-- 7 View the percentage of active vs inactive members of a given organization for the last n semesters. (Note: n is a positive integer)
-- to change the semesters (n), change the value of 4 (past_n_emesters) in the select statement, 
SELECT 
    4 as past_n_emesters,
    100 * (SELECT COUNT(*) 
     FROM organization_has_member AS ohm 
     JOIN organization AS o ON ohm.organization_id = o.organization_id 
     WHERE ohm.member_status = 'Active' 
       AND o.organization_id = 1 -- change this to the desired organization
       AND (
           CASE 
               WHEN semester = '1st Semester' THEN 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2)
               ELSE 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2) - 1 
           END
       ) <= 4 -- past n semesters (change all of this to change the number of semesters)
    ) / (SELECT COUNT(*) 
     FROM organization_has_member AS ohm 
     JOIN organization AS o ON ohm.organization_id = o.organization_id 
     WHERE o.organization_id = 1 -- change this to the desired organization
       AND (
           CASE 
               WHEN semester = '1st Semester' THEN 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2)
               ELSE 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2) - 1 
           END
       ) <= 4 -- passt n semesters (change all of this to change the number of semesters)
    ) AS active_count_percentage, 

    100 * (SELECT COUNT(*) 
     FROM organization_has_member AS ohm 
     JOIN organization AS o ON ohm.organization_id = o.organization_id 
     WHERE ohm.member_status = 'Inactive' 
       AND o.organization_id = 1 -- change this to the desired organization
       AND (
           CASE 
               WHEN semester = '1st Semester' THEN 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2)
               ELSE 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2) - 1 
           END
       ) <= 4 -- past n semesters (change all of this to change the number of semesters)
    ) / (SELECT COUNT(*) 
     FROM organization_has_member AS ohm 
     JOIN organization AS o ON ohm.organization_id = o.organization_id 
     WHERE o.organization_id = 1 -- change this to the desired organization
       AND (
           CASE 
               WHEN semester = '1st Semester' THEN 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2)
               ELSE 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2) - 1 
           END
       ) <= 4 -- past n semesters (change all of this to change the number of semesters)
    ) AS inactive_count_percentage,

    (SELECT COUNT(*) 
     FROM organization_has_member AS ohm 
     JOIN organization AS o ON ohm.organization_id = o.organization_id 
     WHERE o.organization_id = 1 -- change this to the desired organization
       AND (
           CASE 
               WHEN semester = '1st Semester' THEN 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2)
               ELSE 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2) - 1 
           END
       ) <= 4 -- past n semesters (change all of this to change the number of semesters)
    ) AS total_members;


-- 8 View all alumni members of a given organization as of a given date.
-- set arbitrary datss for 1st semester and 2nd semester
-- start of 1st semester: Aug (8)
-- start of 2nd semester: Jan (1)
-- if given date is between Aug and Dec (8, 9, 10, 11, 12), then it is 1st semester
-- if given date is between Jan and July (1, 2, 3, 4, 5, 6, 7), then it is 2nd semester
-- (disregard midyear semester)
SELECT m.member_id, CONCAT(m.first_name,' ', m.last_name) AS full_name, ohm.semester, ohm.academic_year
FROM organization AS o 
JOIN organization_has_member AS ohm  
ON o.organization_id = ohm.organization_id 
JOIN member AS m
ON m.member_id = ohm.member_id
WHERE ohm.member_status = 'active' 
  AND o.organization_id = 1 -- change this to the desired organization
  AND (
      (MONTH(CURDATE()) BETWEEN 8 AND 12 AND ohm.semester = '1st Semester') OR
      (MONTH(CURDATE()) BETWEEN 1 AND 7 AND ohm.semester = '2nd Semester')
  );

-- 9 View the total amount of unpaid and paid fees or dues of a given organization as of a given date.
SELECT SUM(f.fee_amount) AS total_fees
FROM fee AS f 
JOIN organization AS o
ON f.organization_id = o.organization_id 
WHERE o.organization_id = 1  -- change this to the desired organization
    AND f.due_date <= CURDATE();

-- 10 View the member/s with the highest debt of a given organization for a given semester.
SELECT m.member_id, CONCAT(m.first_name, ' ', m.middle_name, ' ', m.last_name) AS full_name, f.fee_amount
FROM member AS m
JOIN organization_has_member AS ohm
ON m.member_id = ohm.member_id
JOIN fee AS f
ON ohm.member_id = f.member_id
WHERE f.date_paid IS NULL 
  AND ohm.organization_id = 1 -- change this to the desired organization
  AND f.fee_amount = (SELECT MAX(fee_amount) FROM fee WHERE date_paid IS NULL);
