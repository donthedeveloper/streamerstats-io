const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const {ChannelTime} = require('../../models');

router.post('/', (req, res) => {
    ChannelTime.create({
        username: req.body.username, 
        joined: req.body.joined
    })
    .then((channeltimeObj) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.status(400).send({
            errorMessage: err.errors[0].message
        });
    })
});

router.put('/:username', (req, res) => {
    console.log(chalk.red('parted:', req.body.parted));
    console.log(chalk.red('username:', req.params.username));

    ChannelTime.findAll({
        where: {
            username: req.params.username
        }, 
        order: '"createdAt" DESC'
    })
    .then((userEntries) => {
        if (userEntries[0]) {
            ChannelTime.update({
                parted: req.body.parted
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
        }
    });
})

module.exports = router;