-- Create Database
create database studorg;

--switch to database
use studorg;

--Create Organization Tabble
CREATE TABLE organization(
    organization_id INT(3) NOT NULL,
    organization_name VARCHAR(50) NOT NULL,
    organization_type VARCHAR(20),
    date_established DATE,
    years_active INT(3),
    organization_username VARCHAR(20) NOT NULL,
    organization_password VARCHAR(20) NOT NULL,

    PRIMARY KEY(organization_id)
);

-- Create Member Table
CREATE TABLE member(
    member_id INT(4) NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    middle_name VARCHAR(15),
    last_name VARCHAR(15) NOT NULL,
    sex VARCHAR(6) NOT NULL,
    degree_program VARCHAR(6) NOT NULL,
    batch YEAR NOT NULL,
    member_username VARCHAR(20) NOT NULL,
    member_password VARCHAR(20) NOT NULL,

    PRIMARY KEY(member_id)
);

--Create Fee Table
CREATE TABLE fee(
    fee_id INT(4) NOT NULL,
    fee_amount INT(5) NOT NULL,
    due_date DATE NOT NULL,
    payment_status VARCHAR(6),
    fee_semester VARCHAR(12),
    academic_year VARCHAR(9),
    organization_id INT(3),
    member_id INT(3),

    PRIMARY KEY(fee_id),
    CONSTRAINT fee_organization_id_fk FOREIGN KEY(organization_id) REFERENCES organization(organization_id),
    CONSTRAINT fee_member_id_fk FOREIGN KEY(member_id) REFERENCES member(member_id)
);

--Create organization event table
CREATE TABLE organization_event(
    organization_id INT(3),
    event_name VARCHAR(50),

    CONSTRAINT organization_event_organization_id_fk FOREIGN KEY(organization_id) REFERENCES organization(organization_id)
);

--Create organization has member table
CREATE TABLE organization_has_member(
    organization_id INT(3),
    member_id INT(3),
    committee VARCHAR(30),
    role VARCHAR(30),
    academic_year VARCHAR(9),
    semester VARCHAR(12),

    CONSTRAINT organization_has_member_organization_id_fk FOREIGN KEY(organization_id) REFERENCES organization(organization_id),
    CONSTRAINT organization_has_member_member_id_fk FOREIGN KEY(member_id) REFERENCES member(member_id)
);

