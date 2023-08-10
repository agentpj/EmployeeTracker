const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Wesley19680412",
    database: "employee_db"
},
    console.log(`Connected to the employee_db database.`)
);

console.log('Welcome to the Employee Tracking Database for XYZ Manufacturing Company');

function getAction() {
    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do? ",
                choices: ["View all Employees", "View Employees by Manager", "View Employees by Department",
                "View all Departments", "View all Roles", "Add new Employee", "Add new Department", "Add new Role",
                "Update an Employee", "Delete an Employee", "Delete a Department", "Delete a Role",
                "Exit"],
                name: "actionAnswer"
            }
        )
        .then(({ actionAnswer }) => {
            console.log({ actionAnswer });
            switch (actionAnswer) {
                case 'View all Employees':
                    getAllEmployees();
                    break;
                case 'View Employees by Manager':
                    getEmployeesByManager();
                    break;
                case 'View Employees by Department':
                    getEmployeesByDepartment();
                    break;
                case 'View all Departments':
                    getAllDepartments();
                    break;
                case 'View all Roles':
                    getAllRoles();
                    break;
                case 'Add new Employee':
                    addNewEmployee();
                    break;
                case 'Add new Department':
                    addNewDepartment();
                    break;
                case 'Add new Role':
                    addNewRole();
                    break;
                case 'Update an Employee':
                    updateEmployee();
                    break;
                case 'Delete an Employee':
                    deleteEmployee();
                    break;
                case 'Delete a Department':
                    deleteDepartment();
                    break;
                case 'Delete a Role':
                    deleteRole();
                    break;
                case 'Exit':
                    exitAction();
                    break;
                default:
                    getAction();
            }
        })
        .catch((err) => {
            console.log(err);
            console.log('Error in actions.');
        });
};

// Read all employee
function getAllEmployees() {
    const sql = `SELECT employee.e_id AS id,
   employee.e_first_name AS first_name,
   employee.e_last_name AS last_name,
   role.r_title AS title,
   department.d_name AS department,
   role.r_salary AS salary,
   employee.e_manager_id AS manager
   FROM employee
   LEFT JOIN role on role.r_id = employee.e_role_id 
   LEFT JOIN department on department.d_id = role.r_department_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows)
        getAction()
    }
    )
};

// Get all employees under a specific Manager
function getEmployeesByManager() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "Enter Manager Number to report Employees under:",
                name: "managerInputId"
            }
        ])
        .then(function(answer) {
    db.query(`SELECT employee.e_id AS id,
    employee.e_first_name AS first_name,
    employee.e_last_name AS last_name,
    role.r_title AS title,
    department.d_name AS department,
    role.r_salary AS salary,
    employee.e_manager_id AS manager
    FROM employee
    LEFT JOIN role on role.r_id = employee.e_role_id 
    LEFT JOIN department on department.d_id = role.r_department_id
    WHERE ${answer.managerInputId} = employee.e_manager_id`, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows)
        getAction()
       }
    )
    })
};

// Get employees by specific Department
function getEmployeesByDepartment() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "Enter Department Number to report Employees under:",
                name: "departmentInputId"
            }
        ])
        .then(function(answer) {
    db.query(`SELECT employee.e_id AS id,
    employee.e_first_name AS first_name,
    employee.e_last_name AS last_name,
    role.r_title AS title,
    department.d_name AS department,
    role.r_salary AS salary,
    employee.e_manager_id AS manager
    FROM employee
    LEFT JOIN role on role.r_id = employee.e_role_id 
    LEFT JOIN department on department.d_id = role.r_department_id
    WHERE ${answer.departmentInputId} = department.d_id`, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows)
        getAction()
       }
    )
    })
};


// Read all departments
function getAllDepartments() {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows)
        getAction()
    }
    )
};


//Read all roles
function getAllRoles() {
    const sql = `SELECT role.r_id AS id,
   role.r_title AS title,
   department.d_name AS department,
   role.r_salary AS salary
   FROM role
   LEFT JOIN department ON department.d_id = role.r_department_id
   ORDER BY department.d_id;`;

    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows)
        getAction()
    })
};

//Add a new Employee
function addNewEmployee() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "Employee ID: ",
                name: "inputId"
            },
            {
                type: "input",
                message: "Employee First Name: ",
                name: "inputFirstName"
            },
            {
                type: "input",
                message: "Employee Last Name: ",
                name: "inputLastName"
            },
            {
                type: "number",
                message: "Employee's Role ID: ",
                name: "inputRoleId"
            },
            {
                type: "number",
                message: "Employee's Manager ID ",
                name: "inputManagerID"
            }
        ])
        .then(function(answer) {
            db.query(`INSERT INTO employee (e_id, e_first_name, e_last_name, e_role_id, e_manager_id)
VALUES (?,?,?,?,?)`,[answer.inputId, answer.inputFirstName, answer.inputLastName, answer.inputRoleId, answer.inputManagerID], (err,res) => {
           if (err) {
               console.log('Error in adding new employee.');
               return;
            }
          getAllEmployees()
          })
          })
};

// Update an employee's Role
function updateEmployee() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "Enter Employee ID to update:",
                name: "updateId"
            },
            {
                type: "number",
                message: "Enter new Role ID",
                name: "updateRole"
            }
        ])
        .then(function(answer) {
            db.query(`UPDATE employee SET e_role_id = ${answer.updateRole} WHERE ${answer.updateId} = e_role_id`, (err,res) => {
           if (err) {
               console.log('Error in updating employee role.');
               return;
            }
           getAllEmployees()
          })
          })
};

// Delete an Employee based on their id
function deleteEmployee() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "Enter Employee ID to delete:",
                name: "deleteId"
            }
        ])
        .then(function(answer) {
            db.query(`DELETE FROM employee WHERE ${answer.deleteId} = e_id`, (err,res) => {
           if (err) {
               console.log('Error in deleting employee');
               return;
            }
           getAllEmployees()
          })
          })
};

// Add a Department
function addNewDepartment() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "New Department ID: ",
                name: "inputDepartmentId"
            },
            {
                type: "input",
                message: "New Department Name: ",
                name: "inputDepartmentName"
            }
        ])
        .then(function(answer) {
            db.query(`INSERT INTO department (d_id, d_name)
            VALUES(?,?)`, [answer.inputDepartmentId, answer.inputDepartmentName], (err,res) => {
           if (err) {
               console.log('Error in adding new department.');
               return;
            }
           getAllDepartments()
          })
          })
};

// Delete a Department from department id
function deleteDepartment() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "Enter Department ID to delete:",
                name: "deletedeptId"
            }
        ])
        .then(function(answer) {
            db.query(`DELETE FROM department WHERE ${answer.deletedeptId} = d_id`, (err,res) => {
           if (err) {
               console.log('Error in deleting department');
               return;
            }
           getAllDepartments()
          })
          })
};

// Add a Role
function addNewRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter Role Title: ",
                name: "inputRoleTitle"
            },
            {
                type: "number",
                message: "Enter Salary: ",
                name: "inputRoleSalary"
            },
            {
                type: "number",
                message: "Enter Department Id ",
                name: "inputRoleDepartmentID"
            }
        ])
        .then(function(answer) {
            db.query(`INSERT INTO role (r_id, r_title, r_salary, r_department_id)
            VALUES(?,?,?,?)`, [answer.inputRoleTitle, answer.inputRoleSalary, answer.inputRoleDepartmentID], (err,res) => {
           if (err) {
               console.log('Error in adding new role ');
               return;
            }
        getAllRoles()
        })
          })
};

// Delete Roles from role id
function deleteRole() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "Enter Role ID to delete:",
                name: "deleteRoleId"
            }
        ])
        .then(function(answer) {
            db.query(`DELETE FROM role WHERE ${answer.deleteRoleId} = r_id`, (err,res) => {
           if (err) {
               console.log('Error in deleting role');
               return;
            }
           getAllRoles()
          })
          })
};

function exitAction() {
    db.end()
    console.log(`No longer connected to the employee_db database.`)
    process.exit();
}

getAction();