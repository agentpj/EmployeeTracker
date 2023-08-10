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
    , getAction()
);

function getAction() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do? ",
                name: "actionAnswer",
                choices: ["View all Employees", "View all Departments", "View all Roles",
                    "Add new Employee", "Add new Department", "Add new Role",
                    "Exit",]
            }
        ])
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
                case 'Exit':
                    exitAction();
                    break;
            }
        })
        .catch((err) => {
            console.log(err);
            console.log('Oops. Something went wrong.');
        })
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
                type: "input",
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
                type: "input",
                message: "Employee's Role ID: ",
                name: "inputRoleId"
            },
            {
                type: "input",
                message: "Employee's Manager ID ",
                name: "inputManagerID"
            }
        ])
        .then(() => {
            db.query(`INSERT INTO employee (e_id, e_first_name, e_last_name, e_role_id, e_manager_id)
VALUES (?,?,?,?,?),({inputId}, {inputFirstName}, {inputLastName}, {inputRoleId}, {inputManagerID});`, (err,res) => {
           if (err) {
               console.log({inputId},{inputFirstName});
               return;
            }})
          })
};



function addNewDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "New Department Name: ",
                name: "inputDepartmentName"
            }
        ])
        .then(addDepartment())
        .catch((err) => {
            console.log(err);
            console.log('Oops. Something went wrong.');
        })
};

function addDepartment() {
    const sql = `INSERT INTO department (d_id, d_name)
    VALUES (inputDepartmentName);`

    db.query(sql, (err, res) => {
        if (err) {
            return;
        }
        console.log("Department added")
        getAction()
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
                type: "input",
                message: "Enter Salary: ",
                name: "inputRoleSalary"
            },
            {
                type: "input",
                message: "Enter Department Id ",
                name: "inputRoleDepartmentID"
            }
        ])
        .then(addRole())
        .catch((err) => {
            console.log(err);
            console.log('Oops. Something went wrong.');
        })
};

function addRole() {
    const sql = `INSERT INTO role (r_id, r_title, r_salary, r_department_id)
    VALUES (inputRoleTitle,inputRoleSalary,inutRoleDepartmentID);`

    db.query(sql, (err, res) => {
        if (err) {
            return;
        }
        console.log("Role added")
        getAction()
    })
};

function exitAction() {
    db.end()
    console.log(`No longer connected to the employee_db database.`)
    process.exit();
}