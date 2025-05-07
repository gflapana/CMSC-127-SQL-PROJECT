-- switch database
use studorg

-- UPDATE FEE ATTRIBUTES
-- update fee amount
UPDATE fee SET fee_amount=2000 WHERE fee_id=2;

-- update due date
UPDATE fee SET due_date="2025-05-10" WHERE fee_id=1;
UPDATE fee SET payment_status = CASE WHEN date_paid IS NULL THEN 'Unpaid' WHEN DATE(date_paid) <= DATE(due_date) THEN 'Paid' ELSE 'Paid Late' END WHERE fee_id = 1 AND member_id = 1;

-- update date paid, and also updates the payment status
UPDATE fee SET date_paid="2025-04-15" WHERE fee_id=1 AND member_id=1;
UPDATE fee SET payment_status = CASE WHEN DATE(date_paid) <= DATE(due_date) THEN 'Paid' ELSE 'Paid Late' END WHERE fee_id = 1 AND member_id = 1;

-- UPDATE MEMBER ATTRIBUTES

-- update degree program
UPDATE member SET degree_program="Bachelor of Science in Biology" WHERE member_id=1 AND member_password="emy1234";

-- update name

-- update first name
UPDATE member SET first_name="Jan" WHERE member_id=1 AND member_password="emy1234";

-- middle name
UPDATE member SET middle_name="Emi" WHERE member_id=1 AND member_password="emy1234";

-- last name
UPDATE member SET last_name="Botista" WHERE member_id=1 AND member_password="emy1234";

-- update member username
UPDATE member SET member_username="emycute" WHERE member_id=1 AND member_password="emy1234";

-- update member password
UPDATE member SET member_password="emysocute" WHERE member_id=6 AND member_password="emy1234";


--UPDATE ORGANIZATION ATTRIBUTES

-- update organization name
UPDATE organization SET organization_name = "Young Software Engineer's Society" WHERE organization_id=1 AND organization_password="ysesexperience";

-- update organization type
UPDATE organization SET organization_type = "Akademika" WHERE organization_id=1 AND organization_password="ysesexperience";

-- update date established
UPDATE organization SET date_established = 2002, years_active = YEAR(CURDATE()-2002) WHERE organization_id=1 AND organization_password="ysesexperience";

-- update organization username
UPDATE organization SET organization_username = "yses2002" WHERE organization_id=1 AND organization_password="ysesexperience";

-- update organization password
UPDATE organization SET organization_password = "ysesexperts" WHERE organization_id=1 AND organization_password="ysesexperience";



--UPDATE ORGANIZATION EVENT ATTRIBUTES

UPDATE organization_event SET event_name = "YSES Coding Battle" WHERE organization_id = 1;




