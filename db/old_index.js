// this index.js is for the Employee Tracker
// this includes installing NodeJS Inquirer

// require the nodejs files
const inquirer = require('inquirer');
const fs = require('fs');

var filename = './db/employee_db';

// Ask user information to put in the README file
function getAction() {
return inquirer
    .prompt([
               {
            type: 'action',
            message: 'What would you like to do? ',
            name: 'actionAnswer',
            choices: ['View all Employees', 'View all Departments', 'View all Roles'],
        },
    ])
    .then(({ actionAnswer }) =>
    {
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

const getAllEmployees = () =>
  fetch('/api/employees', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
    }
  });

  const getAllDepartments = () =>
  fetch('/api/departments', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
    }
  });

  const getAllRoles = () =>
  fetch('/api/employees', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
    }
  });

  getAction();
