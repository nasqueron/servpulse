const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController.js');
const { authenticate } = require('../middleware/auth.js');

router.post('/webhooks/ingest', authenticate, webhookController.ingest);

module.exports = router;
