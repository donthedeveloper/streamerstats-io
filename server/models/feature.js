const {Sequelize, db} = require('./db');

const Feature = db.define('feature', {
    content: {
        type: Sequelize.TEXT, 
        validate: {
            notEmpty: {
                args: true, 
                msg: 'Feature is required.'
            }
        }
    }
}, {
    hooks: {
        beforeValidate: function (model, options) {
            model.content = model.content || '';
        }
    }
});

module.exports = {Sequelize, db, Feature};