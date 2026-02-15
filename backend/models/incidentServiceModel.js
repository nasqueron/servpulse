const pool = require('../config/database.js');

const linkService = async (incidentId, serviceId) => {
	return await pool.query(`
		INSERT INTO incident_service (incident_id, service_id)
		VALUES ($1, $2)
		ON CONFLICT (incident_id, service_id) DO NOTHING
		RETURNING *
	`, [incidentId, serviceId]);
};

const unlinkService = async (incidentId, serviceId) => {
	return await pool.query(`
		DELETE FROM incident_service
		WHERE incident_id = $1 AND service_id = $2
		RETURNING *
	`, [incidentId, serviceId]);
};

const getServicesByIncident = async (incidentId) => {
	return await pool.query(`
		SELECT s.* FROM service s
		JOIN incident_service isv ON isv.service_id = s.id
		WHERE isv.incident_id = $1
		ORDER BY s.name
	`, [incidentId]);
};

const setServices = async (incidentId, serviceIds) => {
	await pool.query(`DELETE FROM incident_service WHERE incident_id = $1`, [incidentId]);
	if (!serviceIds || serviceIds.length === 0) return { rows: [] };
	const values = serviceIds.map((id, i) => `($1, $${i + 2})`).join(', ');
	return await pool.query(
		`INSERT INTO incident_service (incident_id, service_id) VALUES ${values} RETURNING *`,
		[incidentId, ...serviceIds]
	);
};

module.exports = { linkService, unlinkService, getServicesByIncident, setServices };
