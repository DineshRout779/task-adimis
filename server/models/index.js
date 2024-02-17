const { DB, USER, PASSWORD, HOST, dialect, pool } = require('../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  operatorsAliases: '0',

  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Task = require('./task')(sequelize, Sequelize);

module.exports = db;
