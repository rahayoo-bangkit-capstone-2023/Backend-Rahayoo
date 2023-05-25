const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '34.101.125.193',
    user: 'root',
    password: 'password',
    database: 'rahayoo_app'
})

// Establish the MySQL connection
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
  
  module.exports = connection;