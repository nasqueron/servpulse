const maintenanceModel = require('../models/maintenanceModel.js');

const createMaintenance = async (req, res) => {
	try {
		const result = await maintenanceModel.createMaintenance(req.body);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: 'Error creating maintenance', error: error.message });
	}
};

const getMaintenances = async (req, res) => {
	try {
		const result = await maintenanceModel.getMaintenances();
		res.status(200).json(result.rows);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching maintenances', error: error.message });
	}
};

const getMaintenanceById = async (req, res) => {
	try {
		const result = await maintenanceModel.getMaintenanceById(req.params.id);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Maintenance not found' });
		}
		res.status(200).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching maintenance', error: error.message });
	}
};

const updateMaintenance = async (req, res) => {
	try {
		const result = await maintenanceModel.updateMaintenance(req.params.id, req.body);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Maintenance not found' });
		}
		res.status(200).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: 'Error updating maintenance', error: error.message });
	}
};

const deleteMaintenance = async (req, res) => {
	try {
		const result = await maintenanceModel.deleteMaintenance(req.params.id);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Maintenance not found' });
		}
		res.status(200).json({ message: 'Maintenance deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting maintenance', error: error.message });
	}
};

module.exports = { createMaintenance, getMaintenances, getMaintenanceById, updateMaintenance, deleteMaintenance };
