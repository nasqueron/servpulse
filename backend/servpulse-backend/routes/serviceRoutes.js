// serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController.js');

router.get('/service/getAll', serviceController.getServices);
router.post('/service', serviceController.addService);

// ... other routes for service controller

module.exports = router;
