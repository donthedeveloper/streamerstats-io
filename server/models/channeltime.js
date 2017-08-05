const {Sequelize, db} = require('./db');

const ChannelTime = db.define('channeltime', {
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
        defaultValue: Date.now()
    }, 
    parted: {
        type: Sequelize.DATE, 
        defaultValue: null
    }
}, {
    freezeTableName: true
});

module.exports = {Sequelize, db, ChannelTime};