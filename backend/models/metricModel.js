const pool = require('../config/database.js');

const recordMetric = async (data) => {
	return await pool.query(`
		INSERT INTO metric (service_id, uptime, response_time, error_rate)
		VALUES ($1, $2, $3, $4)
		RETURNING *
	`, [data.service_id, data.uptime || 100, data.response_time, data.error_rate || 0]);
};

const getMetricsByService = async (serviceId, days = 30) => {
	return await pool.query(`
		SELECT * FROM metric
		WHERE service_id = $1 AND recorded_at >= NOW() - INTERVAL '1 day' * $2
		ORDER BY recorded_at ASC
	`, [serviceId, days]);
};

const getLatestMetrics = async () => {
	return await pool.query(`
		SELECT DISTINCT ON (service_id)
			m.*, s.name as service_name
		FROM metric m
		JOIN service s ON s.id = m.service_id
		ORDER BY service_id, recorded_at DESC
	`);
};

const getDailySummary = async (serviceId, days = 30) => {
	return await pool.query(`
		SELECT
			DATE(recorded_at) as date,
			AVG(uptime)::DECIMAL(5,2) as avg_uptime,
			AVG(response_time)::INTEGER as avg_response_time,
			AVG(error_rate)::DECIMAL(5,2) as avg_error_rate,
			COUNT(*) as data_points
		FROM metric
		WHERE service_id = $1 AND recorded_at >= NOW() - INTERVAL '1 day' * $2
		GROUP BY DATE(recorded_at)
		ORDER BY date ASC
	`, [serviceId, days]);
};

module.exports = { recordMetric, getMetricsByService, getLatestMetrics, getDailySummary };
