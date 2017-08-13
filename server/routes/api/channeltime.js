const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const {ChannelTime} = require('../../models');

router.post('/', (req, res) => {
    const username = req.body.username;
    const joined = req.body.joined;

    ChannelTime.create({
        username, 
        joined
    })
    .then((channeltimeObj) => {
        const updatedJoined = channeltimeObj.get('joined');
        res.status(200).send({
            updatedJoined
        });
    })
    .catch((err) => {
        console.error(chalk.red(err.message));
        res.sendStatus(500);
    });
});

router.put('/:username', (req, res) => {
    const username = req.params.username;

    ChannelTime.findAll({
        where: {
            username: req.params.username
        }, 
        order: '"createdAt" DESC'
    })
    .then((userEntries) => {
        const latestUserEntry = userEntries[0];

        // UPDATE USER'S PART
        if (latestUserEntry) {
            latestUserEntry.update({
                parted: req.body.parted
            })
            .then((updatedChanneltimeObj) => {
                const updatedParted = updatedChanneltimeObj.parted;

                res.status(200).send({
                    updatedParted
                });
            })
            .catch((err) => {
                console.error(chalk.red(err));
                res.sendStatus(500);
            });
        }
    })
    .catch((err) => {
        console.error(chalk.red(err));
        res.sendStatus(500);
    })
})

module.exports = router;