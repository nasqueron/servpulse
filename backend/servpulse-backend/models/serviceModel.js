// serviceModel.js
const pool = require('../config/database.js');

const addService = async (data) => {
	return await pool.query('INSERT INTO service (name, "group", description, status) VALUES (\$1, \$2, \$3, \$4) RETURNING *', [data.name, data.group, data.description, data.status]);
};

const getServices = async () => {
	return await pool.query('SELECT * FROM service;');
};

// ... other CRUD methods for service table

module.exports = { addService, getServices, /* ... other CRUD methods */ };
