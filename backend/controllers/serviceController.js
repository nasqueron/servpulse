const serviceModel = require('../models/serviceModel.js');

const addService = async (req, res) => {
	try {
		const result = await serviceModel.addService(req.body);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: 'Error creating service', error: error.message });
	}
};

const getServices = async (req, res) => {
	try {
		const result = await serviceModel.getServices();
		res.status(200).json(result.rows);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching services', error: error.message });
	}
};

const getServiceById = async (req, res) => {
	try {
		const result = await serviceModel.getServiceById(req.params.id);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Service not found' });
		}
		res.status(200).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching service', error: error.message });
	}
};

const updateService = async (req, res) => {
	try {
		const result = await serviceModel.updateService(req.params.id, req.body);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Service not found' });
		}
		res.status(200).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: 'Error updating service', error: error.message });
	}
};

const deleteService = async (req, res) => {
	try {
		const result = await serviceModel.deleteService(req.params.id);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Service not found' });
		}
		res.status(200).json({ message: 'Service deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting service', error: error.message });
	}
};

module.exports = { addService, getServices, getServiceById, updateService, deleteService };
