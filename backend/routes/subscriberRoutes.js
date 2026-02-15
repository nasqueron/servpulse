const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController.js');
const { authenticate } = require('../middleware/auth.js');

router.post('/subscribers', subscriberController.subscribe);
router.get('/subscribers/confirm/:token', subscriberController.confirm);
router.post('/subscribers/unsubscribe-request', subscriberController.requestUnsubscribe);
router.get('/subscribers/unsubscribe/:token', subscriberController.unsubscribe);
router.get('/subscribers', authenticate, subscriberController.getAll);
router.delete('/subscribers/:id', authenticate, subscriberController.remove);

module.exports = router;
