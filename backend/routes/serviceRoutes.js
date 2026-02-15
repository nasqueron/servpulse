const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController.js');
const { authenticate } = require('../middleware/auth.js');

router.get('/services', serviceController.getServices);
router.get('/services/:id', serviceController.getServiceById);
router.post('/services', authenticate, serviceController.addService);
router.put('/services/:id', authenticate, serviceController.updateService);
router.delete('/services/:id', authenticate, serviceController.deleteService);

// Legacy endpoints
router.get('/service/getAll', serviceController.getServices);
router.post('/service', authenticate, serviceController.addService);

module.exports = router;
