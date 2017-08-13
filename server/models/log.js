const {Sequelize, db} = require('./db');

const Log = db.define('log', {
    // event
    event_name: {
        type: Sequelize.STRING, 
        defaultValue: '', 
        validate: {
            notEmpty: {
                args: true, 
                msg: 'Event name required.'
            }
        }
    }
});

module.exports = {Sequelize, db, Log};