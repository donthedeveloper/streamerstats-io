const {Sequelize, db} = require('./db');

const Point = db.define('point', {
    username: {
        type: Sequelize.TEXT, 
        validate: {
            notEmpty: {
                args: true, 
                msg: 'Username is required.'
            }
        }
    },
    joined: {
        type: Sequelize.DATE, 
        notEmpty: {
            args: true, 
            msg: 'Join date is required.'
        }
    }, 
    parted: {
        type: Sequelize.DATE, 
        defaultValue: null
    }
}, {
    hooks: {
        beforeValidate: function (model, options) {
            model.content = model.content || '';
        }
    }
});

module.exports = {Sequelize, db, Point};