// incidentModel.js
const pool = require('../config/database.js');

const createIncident = async (data) => {
	return await pool.query('INSERT INTO incident (title, start_date, update_date, type_id, status) VALUES (\$1, \$2, \$3, \$4, \$5) RETURNING *', [data.title, data.start_date, data.update_date, data.type_id, data.status]);
};

const getIncidents = async () => {
	return await pool.query('SELECT * FROM incident;');
};

// ... other CRUD methods for incident table

module.exports = { createIncident, getIncidents /* ... other CRUD methods */ };
