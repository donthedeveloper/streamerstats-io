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
    joined: {
        type: Sequelize.DATE, 
        defaultValue: '', 
        validate: {
            notEmpty: {
                args: true, 
                msg: 'Join date is required.'
            }
        }
    }, 
    parted: {
        type: Sequelize.DATE
    }
}, {
    hooks: {
        beforeValidate: function (model, options) {
            // console.log('pre-content:', model.content);
            // model.content = model.content || '';
            // console.log('content:', model.content);
            // console.log('type of content:', typeof model.content);
        }
    }
});

module.exports = {Sequelize, db, Point};