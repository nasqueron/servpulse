require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.POSTGRES_CONNECTION_STRING,
});

module.exports = pool;
