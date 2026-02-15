const jwt = require('jsonwebtoken');
const { authenticate, generateToken } = require('../../middleware/auth.js');

const SECRET = process.env.JWT_SECRET || 'servpulse-dev-secret';

const mockRes = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe('auth middleware', () => {
	describe('generateToken', () => {
		it('generates a valid JWT', () => {
			const token = generateToken({ id: 1, role: 'admin' });
			const decoded = jwt.verify(token, SECRET);
			expect(decoded.id).toBe(1);
			expect(decoded.role).toBe('admin');
		});
	});

	describe('authenticate', () => {
		it('passes with valid token', () => {
			const token = generateToken({ id: 1 });
			const req = { headers: { authorization: `Bearer ${token}` } };
			const res = mockRes();
			const next = jest.fn();

			authenticate(req, res, next);

			expect(next).toHaveBeenCalled();
			expect(req.user.id).toBe(1);
		});

		it('rejects missing authorization header', () => {
			const req = { headers: {} };
			const res = mockRes();
			const next = jest.fn();

			authenticate(req, res, next);

			expect(res.status).toHaveBeenCalledWith(401);
			expect(next).not.toHaveBeenCalled();
		});

		it('rejects invalid token', () => {
			const req = { headers: { authorization: 'Bearer invalid-token' } };
			const res = mockRes();
			const next = jest.fn();

			authenticate(req, res, next);

			expect(res.status).toHaveBeenCalledWith(401);
			expect(next).not.toHaveBeenCalled();
		});

		it('rejects non-Bearer scheme', () => {
			const req = { headers: { authorization: 'Basic abc123' } };
			const res = mockRes();
			const next = jest.fn();

			authenticate(req, res, next);

			expect(res.status).toHaveBeenCalledWith(401);
		});
	});
});
