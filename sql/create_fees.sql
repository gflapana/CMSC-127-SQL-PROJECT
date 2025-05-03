--switch to database
use studorg;

-- Insert into Fee Table
INSERT INTO fee(fee_amount, due_date, date_paid, payment_status, semester, academic_year, organization_id, member_id)
VALUES
(1000, '2025-04-14', NULL, "Unpaid", "2nd Semester", "2024-2025", 1, 1),
(1000, '2025-04-14', '2025-04-01', "Paid", "2nd Semester", "2024-2025", 2, 2),
(1000, '2025-04-14', '2025-04-01', "Paid", "2nd Semester", "2024-2025", 3, 3),
(500, '2025-05-14', '2025-05-15', "Paid Late", "2nd Semester", "2024-2025", 4, 5),
(500, '2025-05-14', '2025-05-01', "Paid", "2nd Semester", "2024-2025", 5, 4);