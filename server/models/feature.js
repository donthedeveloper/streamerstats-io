const {Sequelize, db} = require('./db');

const Feature = db.define('feature', {
    content: {
        type: Sequelize.TEXT, 
        allowNull: false
    }
});

module.exports = {Sequelize, db, Feature};