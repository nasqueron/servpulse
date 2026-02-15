const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.js');

router.post('/auth/verify', authenticate, (req, res) => {
	res.json({ valid: true });
});

module.exports = router;
