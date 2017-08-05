const express = require('express');
const router = express.Router();

const subscriberApi = require('./subscribers');
const featureApi = require('./features');
const pointApi = require('./channeltime');

router.use('/subscribers', subscriberApi);
router.use('/features', featureApi);
router.use('/channeltime', pointApi);

module.exports = router;