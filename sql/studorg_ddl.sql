-- Create Database
create database studorg;

--Create Organization Tabble
CREATE TABLE organization{
    organization_num INT(3),
    organization_name VARCHAR(50),
    organization_type VARCHAR(20),
    date_established DATE,
    years_active INT(3),
    organization_username VARCHAR(20),
    organization_password VARCHAR(20),

    PRIMARY KEY(organization_num)
}

