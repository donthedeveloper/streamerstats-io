const express = require('express');
const router = express.Router();

const subscriberApi = require('./subscribers');
const featureApi = require('./features');

router.use('/subscribers', subscriberApi);
router.use('/features', featureApi);

module.exports = router;