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

