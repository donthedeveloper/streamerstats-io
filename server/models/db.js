const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
    // disable logging; default: console.log
    logging: false
});

module.exports = {Sequelize, db};