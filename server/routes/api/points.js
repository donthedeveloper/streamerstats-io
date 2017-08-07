const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const {Point} = require('../../models');

router.put('/:username', (req, res) => {
    Point.findOrCreate({
        where: {
            username: req.params.username
        }
    })
    .then((findResultArr) => {
        console.dir(findResultArr);
    })
    .catch((err) => {
        console.log(err);
    });

    // ChannelTime.findAll({
    //     where: {
    //         username: req.params.username
    //     }, 
    //     order: '"createdAt" DESC'
    // })
    // .then((userEntries) => {
    //     if (userEntries[0]) {
    //         ChannelTime.update({
    //             parted: req.body.parted
    //         }, {
    //             where: {
    //                 id: userEntries[0].id
    //             }
    //         })
    //         .then((updatedCount) => {
    //             if (updatedCount[0]) {
    //                 res.sendStatus(200);
    //             } else {
    //                 res.sendStatus(204);
    //             }
    //         })
    //     }
    // });
})

module.exports = router;