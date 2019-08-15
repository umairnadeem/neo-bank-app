const Sequelize = require('sequelize');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
});

const database = 'neobank'; // Name of the database

// Create a database
connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err) => {
  if (err) return console.error(err);
  return console.log(`Database created ${database}`);
});

const sequelize = new Sequelize(database, 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Successfully connected to ${database}`);
  })
  .catch((err) => {
    console.error(`Unable to connect to ${database}: `, err);
  });

module.exports = sequelize;
