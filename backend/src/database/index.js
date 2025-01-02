const { Sequelize } = require('sequelize');
const { db, username, password, host, dialect } = require('../config/db');

const database = new Sequelize(db, username, password, {
    host: host,
    dialect: dialect
});

module.exports = database