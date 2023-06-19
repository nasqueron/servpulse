const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController.js');

router.get('/config/getAll', configController.getConfig);

module.exports = router;
