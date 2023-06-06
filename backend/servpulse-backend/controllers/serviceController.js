// serviceController.js
const serviceModel = require('../models/serviceModel.js');

const addService = async (req, res) => {
	try {
		const serviceData = req.body;
		const result = await serviceModel.addService(serviceData);

		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ message: 'Error creating service', error: error.message });
	}
};

const getServices = async (req, res) => {
	try {
		const services = await serviceModel.getServices();
		res.status(200).json(services);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching services', error: error.message });
	}
};

// ... other CRUD methods for service controller

module.exports = { addService, getServices, /* ... other CRUD methods */ };
