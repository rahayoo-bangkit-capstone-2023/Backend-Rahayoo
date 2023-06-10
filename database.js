const {Client} = require('pg');
const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME

const client =new Client ({
    host: host,
    user: user,
    password: password,
    database: database,
    port: 5432,
})

// Establish the MySQL connection
client.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to Postgres database');
  });

  module.exports = client;