const express = require('express');
const router = express.Router();
const metricController = require('../controllers/metricController.js');
const { authenticate } = require('../middleware/auth.js');

router.get('/metrics', metricController.getLatestMetrics);
router.get('/metrics/service/:serviceId', metricController.getMetricsByService);
router.get('/metrics/service/:serviceId/daily', metricController.getDailySummary);
router.post('/metrics', authenticate, metricController.recordMetric);

module.exports = router;
