const subscriberModel = require('../models/subscriberModel.js');
const { sendEmail } = require('../services/notificationService.js');

const subscribe = async (req, res) => {
	try {
		const result = await subscriberModel.createSubscriber(req.body);
		const subscriber = result.rows[0];

		if (subscriber.type === 'email' && subscriber.email) {
			const baseUrl = process.env.APP_URL || 'http://localhost:8080';
			const confirmUrl = `${baseUrl}/confirm/${subscriber.confirm_token}`;
			await sendEmail(
				subscriber.email,
				'[ServPulse] Confirm your subscription',
				`You've subscribed to ServPulse status updates.\n\nPlease confirm your subscription by visiting:\n${confirmUrl}\n\nIf you didn't request this, you can ignore this email.`
			);
		}

		res.status(201).json({ message: 'Please check your email to confirm your subscription.' });
	} catch (error) {
		if (error.code === '23505') {
			return res.status(409).json({ message: 'Already subscribed' });
		}
		res.status(500).json({ message: 'Error subscribing', error: error.message });
	}
};

const confirm = async (req, res) => {
	try {
		const result = await subscriberModel.confirmSubscriber(req.params.token);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Invalid or expired confirmation link' });
		}
		res.status(200).json({ message: 'Subscription confirmed' });
	} catch (error) {
		res.status(500).json({ message: 'Error confirming subscription', error: error.message });
	}
};

const unsubscribe = async (req, res) => {
	try {
		const result = await subscriberModel.unsubscribe(req.params.token);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Invalid or expired unsubscribe link' });
		}
		res.status(200).json({ message: 'You have been unsubscribed' });
	} catch (error) {
		res.status(500).json({ message: 'Error unsubscribing', error: error.message });
	}
};

const requestUnsubscribe = async (req, res) => {
	try {
		const result = await subscriberModel.getByEmail(req.body.email);
		const subscriber = result.rows[0];

		if (subscriber && subscriber.unsubscribe_token) {
			const baseUrl = process.env.APP_URL || 'http://localhost:8080';
			const unsubscribeUrl = `${baseUrl}/unsubscribe/${subscriber.unsubscribe_token}`;
			await sendEmail(
				subscriber.email,
				'[ServPulse] Unsubscribe link',
				`You requested your unsubscribe link for ServPulse.\n\nTo unsubscribe, visit:\n${unsubscribeUrl}\n\nIf you didn't request this, you can ignore this email.`
			);
		}

		res.status(200).json({ message: 'If that email is subscribed, an unsubscribe link has been sent.' });
	} catch (error) {
		res.status(500).json({ message: 'Error processing unsubscribe request', error: error.message });
	}
};

const getAll = async (req, res) => {
	try {
		const result = await subscriberModel.getAllSubscribers();
		res.status(200).json(result.rows);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching subscribers', error: error.message });
	}
};

const remove = async (req, res) => {
	try {
		const result = await subscriberModel.deleteSubscriber(req.params.id);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Subscriber not found' });
		}
		res.status(200).json({ message: 'Unsubscribed' });
	} catch (error) {
		res.status(500).json({ message: 'Error unsubscribing', error: error.message });
	}
};

module.exports = { subscribe, confirm, unsubscribe, requestUnsubscribe, getAll, remove };
