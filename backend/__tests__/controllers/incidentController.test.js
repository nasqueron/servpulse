const incidentController = require('../../controllers/incidentController.js');
const incidentModel = require('../../models/incidentModel.js');
const incidentUpdateModel = require('../../models/incidentUpdateModel.js');
const incidentServiceModel = require('../../models/incidentServiceModel.js');

jest.mock('../../models/incidentModel.js');
jest.mock('../../models/incidentUpdateModel.js');
jest.mock('../../models/incidentServiceModel.js');
jest.mock('../../services/notificationService.js', () => ({
	notifyAll: jest.fn(),
}));

const mockRes = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe('incidentController', () => {
	afterEach(() => jest.clearAllMocks());

	describe('getIncidents', () => {
		it('returns all incidents', async () => {
			const incidents = [{ id: 1, title: 'Outage', status: 'investigating' }];
			incidentModel.getIncidents.mockResolvedValue({ rows: incidents });

			const req = {};
			const res = mockRes();
			await incidentController.getIncidents(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(incidents);
		});
	});

	describe('getIncidentById', () => {
		it('returns incident with updates and affected services', async () => {
			incidentModel.getIncidentById.mockResolvedValue({
				rows: [{ id: 1, title: 'Outage' }],
			});
			incidentUpdateModel.getUpdatesByIncidentId.mockResolvedValue({
				rows: [{ id: 1, status: 'investigating', message: 'Looking into it' }],
			});
			incidentServiceModel.getServicesByIncident.mockResolvedValue({
				rows: [{ id: 1, name: 'Web' }],
			});

			const req = { params: { id: 1 } };
			const res = mockRes();
			await incidentController.getIncidentById(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			const data = res.json.mock.calls[0][0];
			expect(data.updates).toHaveLength(1);
			expect(data.affected_services).toHaveLength(1);
		});

		it('returns 404 when not found', async () => {
			incidentModel.getIncidentById.mockResolvedValue({ rows: [] });

			const req = { params: { id: 999 } };
			const res = mockRes();
			await incidentController.getIncidentById(req, res);

			expect(res.status).toHaveBeenCalledWith(404);
		});
	});

	describe('createIncident', () => {
		it('creates an incident with service_ids', async () => {
			const incident = { id: 1, title: 'Outage' };
			incidentModel.createIncident.mockResolvedValue({ rows: [incident] });
			incidentServiceModel.setServices.mockResolvedValue({ rows: [] });

			const req = { body: { title: 'Outage', service_ids: [1, 2] } };
			const res = mockRes();
			await incidentController.createIncident(req, res);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(incidentServiceModel.setServices).toHaveBeenCalledWith(1, [1, 2]);
		});
	});

	describe('resolveIncident', () => {
		it('resolves an incident', async () => {
			incidentModel.resolveIncident.mockResolvedValue({
				rows: [{ id: 1, status: 'resolved' }],
			});
			incidentUpdateModel.addUpdate.mockResolvedValue({ rows: [] });

			const req = { params: { id: 1 }, body: { message: 'Fixed' } };
			const res = mockRes();
			await incidentController.resolveIncident(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(incidentUpdateModel.addUpdate).toHaveBeenCalledWith({
				incident_id: 1,
				status: 'resolved',
				message: 'Fixed',
			});
		});
	});
});
