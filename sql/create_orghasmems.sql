--switch to database
use studorg;

-- Insert into Organization Member Table
INSERT INTO organization_has_member(organization_id, member_id, committee, committee_role, member_status, academic_year, semester)
VALUES
(1, 1, "Visuals and Logistics", "Member", "Active", "2024-2025", "2nd Semester"),
(2, 2, "Service", "Service Head", "Active", "2024-2025", "2nd Semester"),
(1, 3, "Projects and Activities", "Member", "Active", "2024-2025", "2nd Semester"),
(3, 3, "Education", "Member", "Active", "2024-2025", "2nd Semester"),
(4, 5, NULL, NULL, "Inactive", "2024-2025", "2nd Semester"),
(5, 4, "Logistics", "Logistics Head", "Active", "2024-2025", "2nd Semester");