-- Create Database
create database studorg;

--switch to database
use studorg;

--Create Organization Tabble
CREATE TABLE organization(
    organization_id INT(3) NOT NULL AUTO_INCREMENT,
    organization_name VARCHAR(50) NOT NULL,
    organization_type VARCHAR(20) NOT NULL,
    date_established YEAR NOT NULL,
    years_active INT(3) NOT NULL,
    organization_username VARCHAR(20) NOT NULL,
    organization_password VARCHAR(60) NOT NULL,

    PRIMARY KEY(organization_id)
);

-- Create Member Table
CREATE TABLE member(
    member_id INT(4) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(25) NOT NULL,
    middle_name VARCHAR(15),
    last_name VARCHAR(15) NOT NULL,
    sex VARCHAR(6) NOT NULL,
    degree_program VARCHAR(70) NOT NULL,
    batch YEAR NOT NULL,
    member_username VARCHAR(20) NOT NULL,
    member_password VARCHAR(60) NOT NULL,

    PRIMARY KEY(member_id)
);

--Create Fee Table
CREATE TABLE fee(
    fee_id INT(4) NOT NULL AUTO_INCREMENT,
    fee_amount INT(5) NOT NULL,
    due_date DATE NOT NULL,
    date_paid DATE,
    payment_status VARCHAR(10) NOT NULL,
    semester VARCHAR(12) NOT NULL,
    academic_year VARCHAR(9) NOT NULL,
    organization_id INT(3) NOT NULL,
    member_id INT(3) NOT NULL,

    PRIMARY KEY(fee_id),
    CONSTRAINT fee_organization_id_fk FOREIGN KEY(organization_id) REFERENCES organization(organization_id),
    CONSTRAINT fee_member_id_fk FOREIGN KEY(member_id) REFERENCES member(member_id)
);

--Create organization event table
CREATE TABLE organization_event(
    organization_id INT(3) NOT NULL,
    event_name VARCHAR(50) NOT NULL,

    PRIMARY KEY(organization_id, event_name)
);

--Create organization has member table
CREATE TABLE organization_has_member(
    organization_id INT(3) NOT NULL,
    member_id INT(4) NOT NULL,
    committee VARCHAR(30),
    committee_role VARCHAR(30),
    member_status VARCHAR(30),
    academic_year VARCHAR(9) NOT NULL,
    semester VARCHAR(12) NOT NULL,

    PRIMARY KEY(organization_id, member_id, academic_year, semester)
);

