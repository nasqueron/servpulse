const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController.js');
const { authenticate } = require('../middleware/auth.js');

router.get('/maintenances', maintenanceController.getMaintenances);
router.get('/maintenances/:id', maintenanceController.getMaintenanceById);
router.post('/maintenances', authenticate, maintenanceController.createMaintenance);
router.put('/maintenances/:id', authenticate, maintenanceController.updateMaintenance);
router.delete('/maintenances/:id', authenticate, maintenanceController.deleteMaintenance);

module.exports = router;
