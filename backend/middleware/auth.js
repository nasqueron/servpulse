const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'servpulse-dev-secret';

const generateToken = (payload) => {
	return jwt.sign(payload, SECRET, { expiresIn: '24h' });
};

const authenticate = (req, res, next) => {
	const header = req.headers.authorization;

	if (!header || !header.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Authentication required' });
	}

	try {
		const token = header.split(' ')[1];
		req.user = jwt.verify(token, SECRET);
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};

module.exports = { generateToken, authenticate };
