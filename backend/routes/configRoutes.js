const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController.js');
const { authenticate } = require('../middleware/auth.js');

router.get('/config/getAll', configController.getConfig);
router.put('/config', authenticate, configController.updateConfig);

module.exports = router;
