// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    port:  3306,
    user: 'root',
    password: 'Wesley19680412',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);
// Ask user information to put in the README file
startScreen();

function startScreen() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "option"
    })
    .then(function(result) {
      console.log("You entered: " + result.option);
    })
  }



function getAction() {
   inquirer
      .prompt([
          {
              type: "list",
              message: "What would you like to do? ",
              name: "actionAnswer",
              choices: ["View all Employees", "View all Departments", "View all Roles"]
          },
          {
            type: 'input',
            message: 'What color would your like your shape to be? ',
            name: 'shapeColorEl',
        },
      ])
      .then(({ actionAnswer }) =>
      {
        console.log({actionAnswer});
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
          default:
              getAction();
          break;
      }
      })
      .then(() => console.log('Returned rows'))
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      })
  };
  
  

// Read all employee
function getAllEmployees () {
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
    rows.forEach(employee=>
      console.log(rows))
  }
  )};

// Read all departments{
function getAllDepartments() {
  const sql = `SELECT * FROM department`;
  
  db.query(sql, (err, rows) => {
    if (err) {
       return;
    }
    rows.forEach(department=>
       console.log(rows))
    }
    )};
  

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
    //rows.forEach(roles=>
      console.table(rows )
} )
};
  


// Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // BONUS: Update review name
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// Default response for any other request (Not Found)
db.use((req, res) => {
  res.status(404).end();
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });