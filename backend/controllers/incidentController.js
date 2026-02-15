const incidentModel = require('../models/incidentModel.js');

const getIncidents = async (req, res) => {
	try {
		const incidents = await incidentModel.getIncidents();
		res.status(200).json(incidents);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching services', error: error.message });
	}
};

module.exports = { getIncidents };
