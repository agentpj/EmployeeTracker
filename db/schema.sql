DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  d_id INT NOT NULL PRIMARY KEY,
  d_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    r_id INT NOT NULL PRIMARY KEY,
    r_title VARCHAR(30),
    r_salary DECIMAL,
    r_department_id INT
);

CREATE TABLE employee (
    e_id INT NOT NULL PRIMARY KEY,
    e_first_name VARCHAR(30),
    e_last_name VARCHAR(30),
    e_role_id INT,
    e_manager_id INT,
    FOREIGN KEY (e_role_id)
    REFERENCES role(r_id)
    ON DELETE SET NULL
);