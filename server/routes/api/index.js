const express = require('express');
const router = express.Router();

const subscriberApi = require('./subscribers');
const featureApi = require('./features');
const channeltimeApi = require('./channeltime');
const pointsApi = require('./points');
const logsApi = require('./logs');

router.use('/subscribers', subscriberApi);
router.use('/features', featureApi);
router.use('/channeltime', channeltimeApi);
router.use('/points', pointsApi);
router.use('/logs', logsApi);

module.exports = router;