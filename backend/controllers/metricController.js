const metricModel = require('../models/metricModel.js');

const recordMetric = async (req, res) => {
	try {
		const result = await metricModel.recordMetric(req.body);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: 'Error recording metric', error: error.message });
	}
};

const getMetricsByService = async (req, res) => {
	try {
		const days = parseInt(req.query.days) || 30;
		const result = await metricModel.getMetricsByService(req.params.serviceId, days);
		res.status(200).json(result.rows);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching metrics', error: error.message });
	}
};

const getLatestMetrics = async (req, res) => {
	try {
		const result = await metricModel.getLatestMetrics();
		res.status(200).json(result.rows);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching latest metrics', error: error.message });
	}
};

const getDailySummary = async (req, res) => {
	try {
		const days = parseInt(req.query.days) || 30;
		const result = await metricModel.getDailySummary(req.params.serviceId, days);
		res.status(200).json(result.rows);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching daily summary', error: error.message });
	}
};

module.exports = { recordMetric, getMetricsByService, getLatestMetrics, getDailySummary };
