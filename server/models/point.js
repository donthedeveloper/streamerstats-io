const {Sequelize, db} = require('./db');

const Point = db.define('point', {
    username: {
        type: Sequelize.STRING, 
        defaultValue: '', 
        validate: {
            notEmpty: {
                args: true, 
                msg: 'Username is required.'
            }
        }
    },
    points: {
        type: Sequelize.INTEGER, 
        defaultValue: 1, // first time user is detected in chatters
        validate: {
            isNumeric: {
                args: true, 
                msg: 'Points needs to be numeric.'
            }
        }
    }
});

module.exports = {Sequelize, db, Point};