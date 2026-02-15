const serviceController = require('../../controllers/serviceController.js');
const serviceModel = require('../../models/serviceModel.js');

jest.mock('../../models/serviceModel.js');

const mockRes = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe('serviceController', () => {
	afterEach(() => jest.clearAllMocks());

	describe('getServices', () => {
		it('returns all services', async () => {
			const services = [
				{ id: 1, name: 'Web', group: 'Core', status: 'operational' },
				{ id: 2, name: 'API', group: 'Core', status: 'degraded' },
			];
			serviceModel.getServices.mockResolvedValue({ rows: services });

			const req = {};
			const res = mockRes();
			await serviceController.getServices(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(services);
		});

		it('returns 500 on error', async () => {
			serviceModel.getServices.mockRejectedValue(new Error('DB error'));

			const req = {};
			const res = mockRes();
			await serviceController.getServices(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
		});
	});

	describe('getServiceById', () => {
		it('returns a service by id', async () => {
			const service = { id: 1, name: 'Web', status: 'operational' };
			serviceModel.getServiceById.mockResolvedValue({ rows: [service] });

			const req = { params: { id: 1 } };
			const res = mockRes();
			await serviceController.getServiceById(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(service);
		});

		it('returns 404 when not found', async () => {
			serviceModel.getServiceById.mockResolvedValue({ rows: [] });

			const req = { params: { id: 999 } };
			const res = mockRes();
			await serviceController.getServiceById(req, res);

			expect(res.status).toHaveBeenCalledWith(404);
		});
	});

	describe('addService', () => {
		it('creates a service and returns 201', async () => {
			const newService = { id: 3, name: 'Mail', group: 'Comms', status: 'operational' };
			serviceModel.addService.mockResolvedValue({ rows: [newService] });

			const req = { body: { name: 'Mail', group: 'Comms' } };
			const res = mockRes();
			await serviceController.addService(req, res);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith(newService);
		});
	});

	describe('updateService', () => {
		it('updates a service', async () => {
			const updated = { id: 1, name: 'Web', status: 'degraded' };
			serviceModel.updateService.mockResolvedValue({ rows: [updated] });

			const req = { params: { id: 1 }, body: { name: 'Web', status: 'degraded' } };
			const res = mockRes();
			await serviceController.updateService(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(updated);
		});

		it('returns 404 when updating non-existent', async () => {
			serviceModel.updateService.mockResolvedValue({ rows: [] });

			const req = { params: { id: 999 }, body: {} };
			const res = mockRes();
			await serviceController.updateService(req, res);

			expect(res.status).toHaveBeenCalledWith(404);
		});
	});

	describe('deleteService', () => {
		it('deletes a service', async () => {
			serviceModel.deleteService.mockResolvedValue({ rows: [{ id: 1 }] });

			const req = { params: { id: 1 } };
			const res = mockRes();
			await serviceController.deleteService(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
		});

		it('returns 404 when deleting non-existent', async () => {
			serviceModel.deleteService.mockResolvedValue({ rows: [] });

			const req = { params: { id: 999 } };
			const res = mockRes();
			await serviceController.deleteService(req, res);

			expect(res.status).toHaveBeenCalledWith(404);
		});
	});
});
