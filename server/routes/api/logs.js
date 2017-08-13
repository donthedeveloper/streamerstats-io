const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const {Log} = require('../../models');

router.post('/', (req,res) => {
    const eventName = req.body.eventName;

    Log.create({
        event_name: eventName
    })
    .then((eventNameObj) => {
        addedEventName = eventNameObj.get('event_name');
        updatedAt = eventNameObj.get('updatedAt')

        res.status(200).send({
            addedEventName,
            updatedAt
        });
    })
    .catch((err) => {
        console.error(chalk.red(err.message));
        res.sendStatus(500);
    });
});

module.exports = router;