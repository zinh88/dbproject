require('dotenv').config();

const { Client } = require('pg');

const pool = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

pool.connect();

module.exports = pool;