const serviceModel = require('../models/serviceModel.js');
const incidentModel = require('../models/incidentModel.js');
const incidentServiceModel = require('../models/incidentServiceModel.js');
const incidentUpdateModel = require('../models/incidentUpdateModel.js');

const ingest = async (req, res) => {
	try {
		const { service_name, status, message, impact } = req.body;

		if (!service_name || !status) {
			return res.status(400).json({ message: 'service_name and status are required' });
		}

		const services = await serviceModel.getServices();
		const service = services.rows.find(
			(s) => s.name.toLowerCase() === service_name.toLowerCase()
		);

		if (!service) {
			return res.status(404).json({ message: `Service '${service_name}' not found` });
		}

		await serviceModel.updateService(service.id, {
			name: service.name,
			group: service.group,
			description: service.description,
			status: status,
			order: service.order,
		});

		let incident = null;
		if (status !== 'operational') {
			const incidentResult = await incidentModel.createIncident({
				title: message || `${service_name}: ${status}`,
				status: 'investigating',
				impact: impact || 'minor',
			});
			incident = incidentResult.rows[0];
			await incidentServiceModel.setServices(incident.id, [service.id]);
			await incidentUpdateModel.addUpdate({
				incident_id: incident.id,
				status: 'investigating',
				message: message || `Automated alert: ${service_name} is ${status}`,
			});
		}

		res.status(200).json({
			message: 'Status updated',
			service: { id: service.id, name: service.name, status },
			incident: incident,
		});
	} catch (error) {
		res.status(500).json({ message: 'Error processing webhook', error: error.message });
	}
};

module.exports = { ingest };
