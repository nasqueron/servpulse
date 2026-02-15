const pool = require('../config/database.js');

const addService = async (data) => {
	return await pool.query(`
		INSERT INTO service
		(name, "group", description, url, auto_status, status, "order")
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING *
	`, [data.name, data.group, data.description, data.url || null, data.auto_status !== false, data.status || 'operational', data.order || 0]);
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
		SET name = $1, "group" = $2, description = $3, url = $4, auto_status = $5, status = $6, "order" = $7, updated_at = NOW()
		WHERE id = $8
		RETURNING *
	`, [data.name, data.group, data.description, data.url || null, data.auto_status !== false, data.status, data.order, id]);
};

const getServicesWithUrl = async () => {
	return await pool.query(`
		SELECT * FROM service WHERE url IS NOT NULL ORDER BY id;
	`);
};

const deleteService = async (id) => {
	return await pool.query(`
		DELETE FROM service WHERE id = $1 RETURNING *;
	`, [id]);
};

module.exports = { addService, getServices, getServiceById, getServicesWithUrl, updateService, deleteService };
