const {Sequelize, db} = require('./db');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING, 
        allowNull: false, 
        validate: {
            isEmail: true
        }
    }
});

module.exports = {Sequelize, db, User};