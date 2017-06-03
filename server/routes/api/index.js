const express = require('express');
const router = express.Router();

const subscribeApi = require('./subscribe');

router.use('/subscribe', subscribeApi);

module.exports = router;