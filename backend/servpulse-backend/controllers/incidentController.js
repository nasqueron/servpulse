// incidentController.js
const incidentModel = require('../models/incidentModel.js');
const incidentServiceModel = require('../models/incidentServiceModel.js');
const incidentPostModel = require('../models/incidentPostModel.js');
const incidentPostStatusModel = require('../models/incidentPostStatusModel.js');

const getIncidents = async (req, res) => {
	try {
		const incidents = await incidentModel.getIncidents();
		res.status(200).json(incidents);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching services', error: error.message });
	}
};

// ... CRUD methods for incident controller using the respective models

module.exports = { getIncidents,  /* ... CRUD methods for incident controller */ };
