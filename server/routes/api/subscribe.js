const express = require('express');
const router = express.Router();

const {User} = require('../../models');

router.post('/', (req, res) => {
    User.findOrCreate({
        where: {
            email: req.body.email
        }
    })
    .then((email) => {
        res.send(email);
    })
    .catch((err) => {
        res.send(err);
    })
});

module.exports = router;