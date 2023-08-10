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
                choices: ["View all Employees", "View all Departments", "View all Roles",
                    "Add new Employee", "Add new Department", "Add new Role", "Update an Employee",
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
                case 'Exit':
                    exitAction();
                    break;
            }
        })
        .catch((err) => {
            console.log(err);
            console.log('Oops. Something went wrong.');
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

// Read all departments{
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
   FROM ROLE
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

function addNewEmployee() {
    console.log("addnewemployee")
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
               console.log(answer);
               return;
            }
          getAllEmployees()
          })
          })
};

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
               console.log(answer);
               return;
            }
           getAllEmployees()
          })
          })
};

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
               console.log(answer);
               return;
            }
           getAllDepartments()
          })
          })
};


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
               console.log(answer);
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