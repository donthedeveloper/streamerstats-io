const express = require('express');
const router = express.Router();

const {User} = require('../../models');

router.post('/', (req, res) => {

    const chalk = require('chalk');
    console.log(chalk.yellow('email:'));
    console.log(req.body.email);

    User.findOrCreate({
        where: {
            email: req.body.email
        }
    })
    .then((emailObj) => {
        if (emailObj[1]) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409); // email already taken
        }
    })
    .catch((err) => {
        res.sendStatus(400); // invalid email
    })
});

module.exports = router;