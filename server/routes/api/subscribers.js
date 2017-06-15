const express = require('express');
const router = express.Router();

const {User} = require('../../models');

router.post('/', (req, res) => {
    const chalk = require('chalk');

    User.findOrCreate({
        where: {
            email: req.body.email
        }
    })
    .then((emailObj) => {
        console.log(chalk.green('Success!'));
        if (emailObj[1]) {
            res.sendStatus(200);
        } else {
            res.status(409).send({
                errorMessage: 'Email already subscribed.'
            });
        }
    })
    .catch((err) => {
        console.log(chalk.red('Failure..'));
        res.status(400).send({
            errorMessage: err.errors[0].message
        });
    })
});

module.exports = router;