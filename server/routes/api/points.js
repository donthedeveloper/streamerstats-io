const express = require('express');
const router = express.Router();

const {Point} = require('../../models');

router.post('/', (req, res) => {
    Point.create({
        username: req.body.username, 
        // joined: req.body.joined, 
        joined: Date.now()
    })
    .then((pointObj) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.status(400).send({
            errorMessage: err.errors[0].message
        });
    })
});

router.put('/:username', (req, res) => {
    Point.findAll({
        where: {
            username: req.params.username
        }, 
        order: '"createdAt" DESC'
    })
    .then((userEntries) => {
        Point.update({
            // parted: req.body.parted
            parted: Date.now()
        }, {
            where: {
                id: userEntries[0].id
            }
        })
        .then((updatedCount) => {
            if (updatedCount[0]) {
                res.sendStatus(200);
            } else {
                res.sendStatus(204);
            }
        })
    });
})

module.exports = router;