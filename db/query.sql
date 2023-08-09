-- All department works
SELECT * FROM department

-- All roles works
-- ID, TITLE, DEPARTMENT, SALARY
SELECT role.r_id AS id,
role.r_title AS title,
department.d_name AS department,
role.r_salary AS salary
FROM ROLE
LEFT JOIN department ON department.d_id = role.r_department_id
ORDER BY department.d_id;

-- All employees except missing full manager name
-- id, first name, last name, title, department, salary, manager
SELECT employee.e_id AS id,
employee.e_first_name AS first_name,
employee.e_last_name AS last_name,
role.r_title AS title,
department.d_name AS department,
role.r_salary AS salary,
employee.e_manager_id AS manager
FROM employee
LEFT JOIN role on role.r_id = employee.e_role_id 
LEFT JOIN department on department.d_id = role.r_department_id;


// add roles must allow selection of department_id
INSERT INTO role (r_id, r_title, r_salary, r_department_id)
  VALUES (122, "Intern", 1000, 300);

// add department
INSERT INTO department (d_id, d_name)
  VALUES (720, "Service");

// add employee allow selection of role_id and manager_id
INSERT INTO employee (e_id, e_first_name, e_last_name, e_role_id, e_manager_id)
  VALUES (5023, "Hulk", "Mom", 180, 1023);