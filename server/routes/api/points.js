const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const {Point} = require('../../models');

router.put('/:username', (req, res) => {
    const username = req.params.username;
    const incrementer = req.body.incrementer;

    Point.findOrCreate({
        where: {
            username: username
        }, 
        defaults: {
            points: incrementer
        }
    })
    .then((findResultArr) => {
        const pointsObj = findResultArr[0];
        const points = pointsObj.points;

        const userAlreadyExists = !findResultArr[1];

        // UPDATE USER
        if (userAlreadyExists) {
            pointsObj.update({
                points: points + incrementer
            })
            .then((updatedPointsObj) => {
                updatedPoints = updatedPointsObj.points;
                res.status(200).send({
                    prevPoints: points, 
                    updatedPoints
                });
            })
            .catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
        // USER CREATED
        } else {
            res.status(201).send({
                prevPoints: null, 
                updatedPoints: 1
            })
        }
    })
    .catch((err) => {
        console.error(err);
    });

})

module.exports = router;