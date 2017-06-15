const express = require('express');
const router = express.Router();

const {Feature} = require('../../models');

router.post('/', (req, res) => {
    Feature.create({
        content: req.body.content
    })
    .then((featureObj) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.status(400).send({
            errorMessage: err.errors[0].message
        });
    })
});

module.exports = router;