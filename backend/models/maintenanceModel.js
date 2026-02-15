const pool = require('../config/database.js');

const createMaintenance = async (data) => {
	return await pool.query(`
		INSERT INTO maintenance (title, description, scheduled_start, scheduled_end)
		VALUES ($1, $2, $3, $4)
		RETURNING *
	`, [data.title, data.description, data.scheduled_start, data.scheduled_end]);
};

const getMaintenances = async () => {
	return await pool.query(`
		SELECT * FROM maintenance ORDER BY scheduled_start DESC;
	`);
};

const getMaintenanceById = async (id) => {
	return await pool.query(`
		SELECT * FROM maintenance WHERE id = $1;
	`, [id]);
};

const updateMaintenance = async (id, data) => {
	return await pool.query(`
		UPDATE maintenance
		SET title = $1, description = $2, scheduled_start = $3, scheduled_end = $4, status = $5
		WHERE id = $6
		RETURNING *
	`, [data.title, data.description, data.scheduled_start, data.scheduled_end, data.status, id]);
};

const deleteMaintenance = async (id) => {
	return await pool.query(`
		DELETE FROM maintenance WHERE id = $1 RETURNING *;
	`, [id]);
};

module.exports = { createMaintenance, getMaintenances, getMaintenanceById, updateMaintenance, deleteMaintenance };
