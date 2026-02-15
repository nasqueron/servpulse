const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController.js');
const { authenticate } = require('../middleware/auth.js');

router.get('/incidents', incidentController.getIncidents);
router.get('/incidents/:id', incidentController.getIncidentById);
router.post('/incidents', authenticate, incidentController.createIncident);
router.put('/incidents/:id', authenticate, incidentController.updateIncident);
router.put('/incidents/:id/resolve', authenticate, incidentController.resolveIncident);

// Legacy endpoint
router.get('/incident/getAll', incidentController.getIncidents);

module.exports = router;
