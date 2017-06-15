const {Sequelize, db} = require('./db');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING, 
        // defaultValue: '', 
        validate: {
            notEmpty: {
                args: true, 
                msg: 'Email is required.'
            }, 
            isEmail: { 
                args: true, 
                msg: 'Invalid email.'
            }
        }
    }
}, {
    hooks: {
        beforeValidate: function (model, options) {
            model.email = model.email || '';
        }
    },
});

module.exports = {Sequelize, db, User};