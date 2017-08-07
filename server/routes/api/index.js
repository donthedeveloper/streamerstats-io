const express = require('express');
const router = express.Router();

const subscriberApi = require('./subscribers');
const featureApi = require('./features');
const channeltimeApi = require('./channeltime');
const pointsApi = require('./points');

router.use('/subscribers', subscriberApi);
router.use('/features', featureApi);
router.use('/channeltime', channeltimeApi);
router.use('/points', pointsApi);

module.exports = router;