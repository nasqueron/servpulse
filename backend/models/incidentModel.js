const pool = require('../config/database.js');

const createIncident = async (data) => {
	return await pool.query(`
		INSERT INTO incident (title, start_date, type_id, status, impact)
		VALUES ($1, NOW(), $2, $3, $4)
		RETURNING *
	`, [data.title, data.type_id || 1, data.status || 'investigating', data.impact || 'none']);
};

const getIncidents = async () => {
	return await pool.query(`
		SELECT * FROM incident ORDER BY start_date DESC;
	`);
};

const getIncidentById = async (id) => {
	return await pool.query(`
		SELECT * FROM incident WHERE id = $1;
	`, [id]);
};

const updateIncident = async (id, data) => {
	return await pool.query(`
		UPDATE incident
		SET title = $1, status = $2, impact = $3, update_date = NOW()
		WHERE id = $4
		RETURNING *
	`, [data.title, data.status, data.impact, id]);
};

const resolveIncident = async (id) => {
	return await pool.query(`
		UPDATE incident
		SET status = 'resolved', end_date = NOW(), update_date = NOW()
		WHERE id = $1
		RETURNING *
	`, [id]);
};

module.exports = { createIncident, getIncidents, getIncidentById, updateIncident, resolveIncident };
