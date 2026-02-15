const incidentModel = require('../models/incidentModel.js');
const incidentUpdateModel = require('../models/incidentUpdateModel.js');

const createIncident = async (req, res) => {
	try {
		const result = await incidentModel.createIncident(req.body);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: 'Error creating incident', error: error.message });
	}
};

const getIncidents = async (req, res) => {
	try {
		const result = await incidentModel.getIncidents();
		res.status(200).json(result.rows);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching incidents', error: error.message });
	}
};

const getIncidentById = async (req, res) => {
	try {
		const incident = await incidentModel.getIncidentById(req.params.id);
		if (incident.rows.length === 0) {
			return res.status(404).json({ message: 'Incident not found' });
		}
		const updates = await incidentUpdateModel.getUpdatesByIncidentId(req.params.id);
		res.status(200).json({ ...incident.rows[0], updates: updates.rows });
	} catch (error) {
		res.status(500).json({ message: 'Error fetching incident', error: error.message });
	}
};

const updateIncident = async (req, res) => {
	try {
		const result = await incidentModel.updateIncident(req.params.id, req.body);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Incident not found' });
		}
		if (req.body.message) {
			await incidentUpdateModel.addUpdate({
				incident_id: req.params.id,
				status: req.body.status,
				message: req.body.message
			});
		}
		res.status(200).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: 'Error updating incident', error: error.message });
	}
};

const resolveIncident = async (req, res) => {
	try {
		const result = await incidentModel.resolveIncident(req.params.id);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Incident not found' });
		}
		await incidentUpdateModel.addUpdate({
			incident_id: req.params.id,
			status: 'resolved',
			message: req.body.message || 'Incident resolved'
		});
		res.status(200).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: 'Error resolving incident', error: error.message });
	}
};

module.exports = { createIncident, getIncidents, getIncidentById, updateIncident, resolveIncident };
