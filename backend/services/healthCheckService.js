const axios = require('axios');
const serviceModel = require('../models/serviceModel.js');
const metricModel = require('../models/metricModel.js');

const CHECK_INTERVAL = parseInt(process.env.HEALTH_CHECK_INTERVAL) || 60000;

const checkService = async (service) => {
	const start = Date.now();
	try {
		const response = await axios.get(service.url, {
			timeout: 10000,
			validateStatus: (status) => status < 500,
		});
		const responseTime = Date.now() - start;
		const isUp = response.status < 400;

		return {
			status: isUp ? 'operational' : 'major',
			response_time: responseTime,
			uptime: isUp ? 100 : 0,
			error_rate: isUp ? 0 : 100,
		};
	} catch {
		return {
			status: 'major',
			response_time: Date.now() - start,
			uptime: 0,
			error_rate: 100,
		};
	}
};

const runChecks = async () => {
	try {
		const result = await serviceModel.getServicesWithUrl();
		const services = result.rows;

		for (const service of services) {
			const check = await checkService(service);

			if (service.auto_status && service.status !== check.status) {
				await serviceModel.updateService(service.id, {
					...service,
					status: check.status,
				});
			}

			await metricModel.recordMetric({
				service_id: service.id,
				uptime: check.uptime,
				response_time: check.response_time,
				error_rate: check.error_rate,
			});
		}
	} catch (error) {
		console.error('Health check error:', error.message);
	}
};

let intervalId = null;

const start = () => {
	if (intervalId) return;
	console.log(`Health checks starting (interval: ${CHECK_INTERVAL / 1000}s)`);
	runChecks();
	intervalId = setInterval(runChecks, CHECK_INTERVAL);
};

const stop = () => {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
	}
};

module.exports = { start, stop, runChecks, checkService };
