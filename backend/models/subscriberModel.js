const pool = require('../config/database.js');
const crypto = require('crypto');

const createSubscriber = async (data) => {
	const confirmToken = crypto.randomBytes(32).toString('hex');
	return await pool.query(`
		INSERT INTO subscriber (email, webhook_url, type, confirm_token)
		VALUES ($1, $2, $3, $4)
		RETURNING id, email, webhook_url, type, confirmed, confirm_token, created_at
	`, [data.email || null, data.webhook_url || null, data.type || 'email', confirmToken]);
};

const confirmSubscriber = async (token) => {
	const unsubscribeToken = crypto.randomBytes(32).toString('hex');
	return await pool.query(`
		UPDATE subscriber SET confirmed = true, confirm_token = NULL, unsubscribe_token = $1
		WHERE confirm_token = $2
		RETURNING id, email, webhook_url, type, confirmed
	`, [unsubscribeToken, token]);
};

const unsubscribe = async (token) => {
	return await pool.query(`
		DELETE FROM subscriber WHERE unsubscribe_token = $1 RETURNING id, email, webhook_url, type
	`, [token]);
};

const getConfirmedSubscribers = async () => {
	return await pool.query(`
		SELECT id, email, webhook_url, type, unsubscribe_token FROM subscriber
		WHERE confirmed = true
		ORDER BY created_at ASC
	`);
};

const getByEmail = async (email) => {
	return await pool.query(`
		SELECT id, email, unsubscribe_token FROM subscriber WHERE email = $1 AND confirmed = true
	`, [email]);
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

module.exports = { createSubscriber, confirmSubscriber, unsubscribe, getConfirmedSubscribers, getByEmail, getAllSubscribers, deleteSubscriber };
