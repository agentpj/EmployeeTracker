# EmployeeTracker
Challenge 12 - Employee Tracker using MySql2, NodeJS 

This project includes NodeJS, Inquirer, and MySql2.

This project allows a business owner to vie and manage the departments, roles and employee information
in a company in order to organize and plan a business.

The user reports and organizes their business through the command line inputs.
The user get a menu of chices when the application is launched such as:
View all employees (employee id, employee first and last name, job title, department, salary and manager id),
View all roles (by job title, role id, department the role corresponds to, and salary for that role)
View all departments (department name and id),
View employees under a specific manager id, *bonus*
View employees under a specific department id, *bonus*
Add an employee,
Add a department,
Add a role,
Update an employee's role or manager id, *bonus*
Delete a department *bonus*
Delete a role *bonus*
Delete an employee *bonus*


This project includes a database schema.sql file for the employee.dbn data with 3 tables (employee, role and department).

The contents of this project includes the following:
index.js
package.json
package-lock-json
license
.gitignore
./db/schema.sql
./db/seeds.sql

A seed.sql file is included to automatically populate contents into the tables mentioned above.

Github repo:
https://github.com/agentpj/EmployeeTracker

Screencastify link:

Project Screenshot:
[The webpage is a basic Employee Tracking application.](./db/EmployeeTracker.jpg)
