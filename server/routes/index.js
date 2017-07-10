const express = require('express');
const router = express.Router();
const path = require('path');

const apiRouter = require('./api');

router.use('/api', apiRouter);
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/index.html'));
});

module.exports = router;
