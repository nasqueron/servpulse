const pool = require('../config/database.js');

const createSubscriber = async (data) => {
	const token = require('crypto').randomBytes(32).toString('hex');
	return await pool.query(`
		INSERT INTO subscriber (email, webhook_url, type, confirm_token)
		VALUES ($1, $2, $3, $4)
		RETURNING id, email, webhook_url, type, confirmed, created_at
	`, [data.email || null, data.webhook_url || null, data.type || 'email', token]);
};

const confirmSubscriber = async (token) => {
	return await pool.query(`
		UPDATE subscriber SET confirmed = true, confirm_token = NULL
		WHERE confirm_token = $1
		RETURNING id, email, webhook_url, type, confirmed
	`, [token]);
};

const getConfirmedSubscribers = async () => {
	return await pool.query(`
		SELECT id, email, webhook_url, type FROM subscriber
		WHERE confirmed = true
		ORDER BY created_at ASC
	`);
};

const getAllSubscribers = async () => {
	return await pool.query(`
		SELECT id, email, webhook_url, type, confirmed, created_at FROM subscriber
		ORDER BY created_at DESC
	`);
};

const deleteSubscriber = async (id) => {
	return await pool.query(`
		DELETE FROM subscriber WHERE id = $1 RETURNING *
	`, [id]);
};

module.exports = { createSubscriber, confirmSubscriber, getConfirmedSubscribers, getAllSubscribers, deleteSubscriber };
