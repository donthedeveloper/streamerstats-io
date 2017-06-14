const express = require('express');
const router = express.Router();

const subscriberApi = require('./subscribers');

router.use('/subscribers', subscriberApi);

module.exports = router;