-- Create Database
create database studorg;

--Create Organization Tabble
CREATE TABLE organization(
    organization_id INT(3),
    organization_name VARCHAR(50) NOT NULL,
    organization_type VARCHAR(20),
    date_established DATE,
    years_active INT(3),
    organization_username VARCHAR(20) NOT NULL,
    organization_password VARCHAR(20) NOT NULL,

    PRIMARY KEY(organization_id)
);

CREATE TABLE member(
    member_id INT(4),
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

