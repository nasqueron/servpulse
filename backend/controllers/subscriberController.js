const subscriberModel = require('../models/subscriberModel.js');

const subscribe = async (req, res) => {
	try {
		const result = await subscriberModel.createSubscriber(req.body);
		res.status(201).json(result.rows[0]);
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
			return res.status(404).json({ message: 'Invalid or expired token' });
		}
		res.status(200).json({ message: 'Subscription confirmed', subscriber: result.rows[0] });
	} catch (error) {
		res.status(500).json({ message: 'Error confirming subscription', error: error.message });
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

module.exports = { subscribe, confirm, getAll, remove };
