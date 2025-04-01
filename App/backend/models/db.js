const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Jacob: Tests the connection to the database
pool.connect()
  .then(() => {
    console.log('Connected to the database successfully.');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    // // Optionally, exits the process if the connection fails
    // process.exit(1);
  });

module.exports = pool;