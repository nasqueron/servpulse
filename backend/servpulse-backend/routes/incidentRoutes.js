// incidentRoutes.js
const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController.js');

router.get('/incident/getAll', incidentController.getIncidents);

// ... other routes for incident controller

module.exports = router;
