const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController.js');

router.get('/incident/getAll', incidentController.getIncidents);

module.exports = router;
