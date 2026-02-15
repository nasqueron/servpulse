const pool = require('../config/database.js');

const addService = async (data) => {
	return await pool.query(`
		INSERT INTO service
		(name, "group", description, status, "order")
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *
	`, [data.name, data.group, data.description, data.status || 'operational', data.order || 0]);
};

const getServices = async () => {
	return await pool.query(`
		SELECT * FROM service ORDER BY "order", "group", name;
	`);
};

const getServiceById = async (id) => {
	return await pool.query(`
		SELECT * FROM service WHERE id = $1;
	`, [id]);
};

const updateService = async (id, data) => {
	return await pool.query(`
		UPDATE service
		SET name = $1, "group" = $2, description = $3, status = $4, "order" = $5, updated_at = NOW()
		WHERE id = $6
		RETURNING *
	`, [data.name, data.group, data.description, data.status, data.order, id]);
};

const deleteService = async (id) => {
	return await pool.query(`
		DELETE FROM service WHERE id = $1 RETURNING *;
	`, [id]);
};

module.exports = { addService, getServices, getServiceById, updateService, deleteService };
