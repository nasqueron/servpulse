const pool = require('../config/database.js');

const addUpdate = async (data) => {
	return await pool.query(`
		INSERT INTO incident_update (incident_id, status, message)
		VALUES ($1, $2, $3)
		RETURNING *
	`, [data.incident_id, data.status, data.message]);
};

const getUpdatesByIncidentId = async (incidentId) => {
	return await pool.query(`
		SELECT * FROM incident_update
		WHERE incident_id = $1
		ORDER BY created_at DESC;
	`, [incidentId]);
};

module.exports = { addUpdate, getUpdatesByIncidentId };
