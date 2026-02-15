const pool = require('../config/database.js');

const setServices = async (maintenanceId, serviceIds) => {
	await pool.query(`DELETE FROM maintenance_service WHERE maintenance_id = $1`, [maintenanceId]);
	if (!serviceIds || serviceIds.length === 0) return { rows: [] };
	const values = serviceIds.map((id, i) => `($1, $${i + 2})`).join(', ');
	return await pool.query(
		`INSERT INTO maintenance_service (maintenance_id, service_id) VALUES ${values} RETURNING *`,
		[maintenanceId, ...serviceIds]
	);
};

const getServicesByMaintenance = async (maintenanceId) => {
	return await pool.query(`
		SELECT s.* FROM service s
		JOIN maintenance_service ms ON ms.service_id = s.id
		WHERE ms.maintenance_id = $1
		ORDER BY s.name
	`, [maintenanceId]);
};

module.exports = { setServices, getServicesByMaintenance };
